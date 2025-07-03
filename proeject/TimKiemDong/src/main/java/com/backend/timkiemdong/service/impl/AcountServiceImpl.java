package com.backend.timkiemdong.service.impl;

import com.backend.timkiemdong.dto.*;
import com.backend.timkiemdong.entity.Acount;
import com.backend.timkiemdong.entity.ParaCurrencyRate;
import com.backend.timkiemdong.entity.Permission;
import com.backend.timkiemdong.entity.Role;
import com.backend.timkiemdong.mapper.AcountMapper;
import com.backend.timkiemdong.repository.AcountRepository;
import com.backend.timkiemdong.repository.PermissionRepository;
import com.backend.timkiemdong.repository.RoleRepository;
import com.backend.timkiemdong.service.AcountService;
import com.backend.timkiemdong.service.AppUserDetailService;
import com.backend.timkiemdong.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class AcountServiceImpl implements AcountService {
    @Autowired
    private AcountRepository acountRepository;
    @Autowired
    private AcountMapper acountMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AppUserDetailService appUserDetailService;

    @Autowired
    private JwtUtil jwtUtil;


    @Override
    public AcountResponse list(AcountResponse acountResponse){
        int page = acountResponse.getPage();
        int size = acountResponse.getSize();
        if (page < 0) {
            page = 0;
            acountResponse.setPage(page);
        }
        if (size <= 0) {
            size = 5;
            acountResponse.setSize(size);
        }

        String sortBy = acountResponse.getSortBy();
        String sortDirection = acountResponse.getSortDirection();

        if (sortBy == null || sortBy.trim().isEmpty()) {
            sortBy = "id";
            acountResponse.setSortBy(sortBy);
        }

        if (sortDirection == null || sortDirection.trim().isEmpty()) {
            sortDirection = "asc";
            acountResponse.setSortDirection(sortDirection);
        }

        if (!sortDirection.equalsIgnoreCase("asc") && !sortDirection.equalsIgnoreCase("desc")) {
            sortDirection = "asc";
            acountResponse.setSortDirection(sortDirection);
        }

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Acount> pagegb = acountRepository.findAll(pageable);
        AcountResponse result = new AcountResponse();
        result.setContent(pagegb.getContent());
        result.setPage(page);
        result.setSize(size);
        result.setTotalElements(pagegb.getTotalElements());
        result.setTotalPages(pagegb.getTotalPages());
        result.setSortBy(sortBy);
        result.setSortDirection(sortDirection);
        return result;
    }



    private void authenticate(String email, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }


//    @Override
//    public AuthResponse login(LoginRequest loginRequest) {
//        // Xác thực email + password
//        authenticate(loginRequest.getEmail(), loginRequest.getPassword());
//
//        // Load thông tin user
//        UserDetails userDetails = appUserDetailService.loadUserByUsername(loginRequest.getEmail());
//
//        // Tạo JWT
//        String jwtToken = jwtUtil.generateToken(userDetails);
//
//        // Lấy role
//        List<String> role = userDetails.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .filter(auth -> auth.startsWith("ROLE_"))
//                .collect(Collectors.toList());
//
//        // Lấy permission
//        List<String>  permission = userDetails.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .filter(auth -> !auth.startsWith("ROLE_"))
//                .collect(Collectors.toList());
//
//        // Lấy tên người dùng
//        Optional<Acount> optionalUser = acountRepository.findByEmail(loginRequest.getEmail());
//        String name = optionalUser.map(Acount::getName).orElse("");
//
//        // Trả về response
//        return new AuthResponse(name, loginRequest.getEmail(), jwtToken, role, permission);
//    }

    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        // Xác thực
        authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        // Lấy thông tin user
        UserDetails userDetails = appUserDetailService.loadUserByUsername(loginRequest.getEmail());

        // Tạo token
        String jwtToken = jwtUtil.generateToken(userDetails);

        // Tách role
        List<String> roleList = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(auth -> auth.startsWith("ROLE_"))
                .collect(Collectors.toList());

        // Lấy tên người dùng
        Optional<Acount> optionalUser = acountRepository.findByEmail(loginRequest.getEmail());
        String name = optionalUser.map(Acount::getName).orElse("");

        // Map role → permission
        Map<String, List<String>> permissionMap = new HashMap<>();
        optionalUser.ifPresent(user -> {
            for (Role role : user.getRoles()) {
                List<String> permissions = role.getPermissions().stream()
                        .map(Permission::getName)
                        .collect(Collectors.toList());

                permissionMap.put(role.getName(), permissions);
            }
        });

        // Trả về response
        return new AuthResponse(name, loginRequest.getEmail(), jwtToken, roleList, permissionMap);
    }




    //    @Override
//    public AcountResponse createAcount(AcountRequest acountRequest){
//            Acount acount = acountMapper.toAcount(acountRequest);
//            acount.setPassword(passwordEncoder.encode(acountRequest.getPassword()));
//
//            if(!acountRepository.existsByEmail(acountRequest.getEmail())){
//                acountRepository.save(acount);
//                return acountMapper.toAcountResponse(acount);
//            }
//            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exist");
//
//    }
    @Override
    public AcountResponse createAcount(AcountRequest acountRequest) {
        if (acountRepository.existsByEmail(acountRequest.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email Already Exist");
        }

        Acount acount = acountMapper.toAcount(acountRequest);
        acount.setPassword(passwordEncoder.encode(acountRequest.getPassword()));

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Default role USER not found. Please initialize roles in DB"));


        acount.setRoles(Set.of(userRole));



        acountRepository.save(acount);
        return acountMapper.toAcountResponse(acount);
    }



    @Override
    public AcountResponse updateAcount(AcountRequest acountRequest){
        long id = acountRequest.getId();
        Acount acount = acountRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Acount Not Found"));
        acountMapper.updateAcount(acountRequest,acount);
        Acount updateAcount = acountRepository.save(acount);
        return acountMapper.toAcountResponse(updateAcount);

    }


    @Override
    public void deleteAcount(AcountRequest acountRequest){
       long id = acountRequest.getId();
       if (!acountRepository.existsById(id)) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Acount Not Found");
       }
        acountRepository.deleteById(id);

    }



}
