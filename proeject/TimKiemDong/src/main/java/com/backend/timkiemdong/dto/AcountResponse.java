package com.backend.timkiemdong.dto;

import com.backend.timkiemdong.entity.Acount;
import com.backend.timkiemdong.entity.ParaCurrencyRate;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AcountResponse {
//    private String name;
//    private String email;
//    private List<String> role;
//    private Map<String, List<String>> permission;
    private int page;
    private int size;
    private int totalPages;
    private long totalElements;
    private String sortBy;
    private String sortDirection;
    private List<Acount> content = new ArrayList<>();
//    private String roles;
//    private String permissions;

}
