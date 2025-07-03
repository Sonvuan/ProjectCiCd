package com.backend.timkiemdong.service;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.PermissionDto;
import com.backend.timkiemdong.entity.Permission;

import java.util.List;

public interface PermissionService {

    List<Permission> getAllPermission(PermissionDto permissionDto);
    PermissionDto createPermission(PermissionDto permissionDto);
    AcountResponse updatePermission (AcountRequest acountRequest);
    AcountResponse removePermission(AcountRequest acountRequest);
}
