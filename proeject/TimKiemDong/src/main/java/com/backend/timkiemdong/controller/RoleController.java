package com.backend.timkiemdong.controller;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.RoleDto;
import com.backend.timkiemdong.entity.Role;
import com.backend.timkiemdong.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/role")
@CrossOrigin(origins = "http://localhost:4200")
public class RoleController {
    @Autowired
    private RoleService roleService;

    @PostMapping("/getAllRole")
    public ResponseEntity<?> getAllRole(RoleDto roleDto) {
        List<Role> roles = roleService.getAllRole(roleDto);
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }


    @PostMapping("/UpdateRole")
    public ResponseEntity<?> role(@RequestBody AcountRequest acountRequest) {
        AcountResponse response = roleService.updateRole(acountRequest);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có dữ liệu tương ứng");
        }
        return ResponseEntity.ok(response);
    }



    @PostMapping("/removeRole")
    public ResponseEntity<?> remove(@RequestBody AcountRequest acountRequest) {
        AcountResponse response = roleService.removeRole(acountRequest);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không có dữ liệu tương ứng");
        }
        return ResponseEntity.ok(response);
    }

}
