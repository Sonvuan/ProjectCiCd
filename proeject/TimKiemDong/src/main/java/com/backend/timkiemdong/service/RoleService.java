package com.backend.timkiemdong.service;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.RoleDto;
import com.backend.timkiemdong.entity.Role;

import java.util.List;

public interface RoleService {
    AcountResponse updateRole(AcountRequest acountRequest);
    AcountResponse removeRole(AcountRequest acountRequest);
    List<Role> getAllRole(RoleDto roleDto);
}
