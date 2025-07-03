package com.backend.timkiemdong.dto;

import lombok.*;

import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String name;
    private String email;
    private String token;
    private List<String> role;
    private Map<String,List<String>>permission;
//    private List<String>  permission;
}
