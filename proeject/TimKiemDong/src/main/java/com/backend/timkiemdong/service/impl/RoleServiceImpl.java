package com.backend.timkiemdong.service.impl;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.ParaCurrencyRateDto;
import com.backend.timkiemdong.dto.RoleDto;
import com.backend.timkiemdong.entity.Acount;
import com.backend.timkiemdong.entity.ParaCurrencyRate;
import com.backend.timkiemdong.entity.Role;
import com.backend.timkiemdong.mapper.AcountMapper;
import com.backend.timkiemdong.mapper.PermissionMapper;
import com.backend.timkiemdong.repository.AcountRepository;
import com.backend.timkiemdong.repository.PermissionRepository;
import com.backend.timkiemdong.repository.RoleRepository;
import com.backend.timkiemdong.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AcountRepository acountRepository;
    @Autowired
    private AcountMapper acountMapper;


    @Override
    public List<Role> getAllRole(RoleDto roleDto) {
        return roleRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    @Override
    public AcountResponse updateRole(AcountRequest acountRequest) {

        Acount acount = acountRepository.findById(acountRequest.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findByName(acountRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Set<Role> roles = acount.getRoles();
        roles.add(role);

        acount.setRoles(roles);
        return acountMapper.toAcountResponse(acountRepository.save(acount));
    }

    @Override
    public AcountResponse removeRole(AcountRequest acountRequest) {
        Acount acount = acountRepository.findById(acountRequest.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Role role = roleRepository.findByName(acountRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Set<Role> roles = acount.getRoles();
        roles.remove(role);
        acount.setRoles(roles);
        return acountMapper.toAcountResponse(acountRepository.save(acount));
    }

}
