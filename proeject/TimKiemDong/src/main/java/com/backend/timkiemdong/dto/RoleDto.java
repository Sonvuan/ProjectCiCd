package com.backend.timkiemdong.dto;

import lombok.*;

import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {

    private String name;
    private String description;
    private Set<Long> permissionIds;


}
