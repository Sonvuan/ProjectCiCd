package com.backend.timkiemdong.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionDto {
    private String name;
    private String description;
    private String url;
}
