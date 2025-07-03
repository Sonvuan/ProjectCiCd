package com.backend.timkiemdong.service.impl;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.PermissionDto;
import com.backend.timkiemdong.dto.RoleDto;
import com.backend.timkiemdong.entity.Acount;
import com.backend.timkiemdong.entity.Permission;
import com.backend.timkiemdong.entity.Role;
import com.backend.timkiemdong.mapper.AcountMapper;
import com.backend.timkiemdong.mapper.PermissionMapper;
import com.backend.timkiemdong.repository.AcountRepository;
import com.backend.timkiemdong.repository.PermissionRepository;
import com.backend.timkiemdong.repository.RoleRepository;
import com.backend.timkiemdong.service.AcountService;
import com.backend.timkiemdong.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service

public class PermissionServiceImpl implements PermissionService {
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AcountRepository acountRepository;
    @Autowired
    private AcountMapper acountMapper;
    @Autowired
    private PermissionMapper permissionMapper;


    @Override
    public PermissionDto createPermission(PermissionDto permissionDto) {
        Permission permission = permissionMapper.toEntity(permissionDto);
        permissionRepository.save(permission);
        return permissionMapper.toDto(permission);
    }


    @Override
    public List<Permission> getAllPermission(PermissionDto permissionDto) {
        return permissionRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

//    @Override
//    public AcountResponse updatePermission(AcountRequest acountRequest) {
//        Acount acount = acountRepository.findById(acountRequest.getId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Permission permission = permissionRepository.findByName(acountRequest.getPermission())
//                .orElseThrow(() -> new RuntimeException("Permission not found"));
//
//
//        // Lấy roles của tài khoản
//        Set<Role> roles = acount.getRoles();
//
//        Role role = roles.stream().findFirst()
//                .orElseThrow(() -> new RuntimeException("Role not found in account"));
//
//        // Thêm permission mới vào role (nếu chưa có)
//        if (!role.getPermissions().contains(permission)) {
//            role.getPermissions().add(permission);
//            roleRepository.save(role);
//        }
//
//
//        acountRepository.save(acount);
//
//        return acountMapper.toAcountResponse(acount);
//    }



    @Override
    public AcountResponse updatePermission(AcountRequest acountRequest) {
        Acount acount = acountRepository.findById(acountRequest.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Permission permission = permissionRepository.findByName(acountRequest.getPermission())
                .orElseThrow(() -> new RuntimeException("Permission not found"));
        Role role = roleRepository.findByName(acountRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Lấy roles của tài khoản
        Set<Role> roles = acount.getRoles();

        // Thêm permission mới vào role (nếu chưa có)
        if (!role.getPermissions().contains(permission)) {
            role.getPermissions().add(permission);
            roleRepository.save(role);
        }


        acountRepository.save(acount);

        return acountMapper.toAcountResponse(acount);
    }

//    @Override
//    public AcountResponse removePermission(AcountRequest acountRequest) {
//        Acount acount = acountRepository.findById(acountRequest.getId())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Permission permission = permissionRepository.findByName(acountRequest.getPermission())
//                .orElseThrow(() -> new RuntimeException("Permission not found"));
//
//        // Lấy roles của tài khoản
//        Set<Role> roles = acount.getRoles();
//        Role role = roles.stream().findFirst()
//                .orElseThrow(() -> new RuntimeException("Role not found in account"));
//
//        // Xoá permission nếu role đang có
//        if (role.getPermissions().contains(permission)) {
//
//            role.getPermissions().remove(permission);
//            roleRepository.save(role);
//        }
//
//        // Cập nhật lại cho account nếu cần
//        acount.setRoles(roles);
//        acountRepository.save(acount);
//
//        return acountMapper.toAcountResponse(acount);
//    }

    @Override
    public AcountResponse removePermission(AcountRequest acountRequest) {
        // Tìm role theo tên
        Role role = roleRepository.findByName(acountRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Tìm permission theo tên
        Permission permission = permissionRepository.findByName(acountRequest.getPermission())
                .orElseThrow(() -> new RuntimeException("Permission not found"));

        // Xoá permission khỏi role (nếu có)
        if (role.getPermissions().contains(permission)) {
            role.getPermissions().remove(permission);
            roleRepository.save(role); // Lưu lại role đã cập nhật
        }

        // Tìm lại user để trả response
        Acount acount = acountRepository.findById(acountRequest.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return acountMapper.toAcountResponse(acount);
    }


}
