package com.backend.timkiemdong.controller;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.PermissionDto;
import com.backend.timkiemdong.dto.RoleDto;
import com.backend.timkiemdong.entity.Permission;
import com.backend.timkiemdong.entity.Role;
import com.backend.timkiemdong.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/permission")
@CrossOrigin(origins = "http://localhost:4200")
public class PermissinController {
    @Autowired
    private PermissionService permissionService;

    @PostMapping("/Create")
    public ResponseEntity<?> createPermission(@RequestBody PermissionDto permissionDto) {
        PermissionDto result = permissionService.createPermission(permissionDto);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PostMapping("/getAllPermission")
    public ResponseEntity<?> getAll(PermissionDto permissionDto) {
        List<Permission> per = permissionService.getAllPermission(permissionDto);
        return new ResponseEntity<>(per, HttpStatus.OK);
    }


    // update permission
    @PostMapping("/UpdatePermission")
    public ResponseEntity<?> permission(@RequestBody AcountRequest acountRequest) {
        AcountResponse response = permissionService.updatePermission(acountRequest);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có dữ liệu tương ứng");
        }
        return ResponseEntity.ok(response);
    }

    // xoá permission

    @PostMapping("/RemovePermission")
    public ResponseEntity<?> removePermission(@RequestBody AcountRequest acountRequest) {
        AcountResponse response = permissionService.removePermission(acountRequest);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có dữ liệu tương ứng");
        }
        return ResponseEntity.ok(response);
    }
}
