package com.backend.timkiemdong.mapper;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.ParaCurrencyRateDto;
import com.backend.timkiemdong.entity.Acount;
import com.backend.timkiemdong.entity.ParaCurrencyRate;
import com.backend.timkiemdong.entity.Permission;
import com.backend.timkiemdong.entity.Role;
import org.mapstruct.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Mapper(componentModel = "spring")
public interface AcountMapper {

    Acount toAcount(AcountRequest acountRequest);

//    @Mapping(target = "role", expression = "java(mapRoles(acount))")
//    @Mapping(target = "permission", expression = "java(mapPermissions(acount))")
    AcountResponse toAcountResponse(Acount acount);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    void updateAcount(AcountRequest acountRequest, @MappingTarget Acount acount);

    //    default Set<String> mapRoles(Acount acount) {
//        return acount.getRoles().stream()
//                .map(Role::getName)
//                .collect(Collectors.toSet());
//    }
    default List<String> mapRoles(Acount acount) {
        return acount.getRoles().stream()
                .map(Role::getName)
                .collect(Collectors.toList());
    }


    //
//    default Set<String> mapPermissions(Acount acount) {
//        return acount.getRoles().stream()
//                .flatMap(role -> role.getPermissions() != null ? role.getPermissions().stream() : Stream.empty())
//                .map(Permission::getName)
//                .collect(Collectors.toSet());
//    }
    default Map<String, List<String>> mapPermissions(Acount acount) {
        return acount.getRoles().stream()
                .collect(Collectors.toMap(
                        Role::getName,
                        role -> role.getPermissions().stream()
                                .map(Permission::getName)
                                .collect(Collectors.toList())
                ));
    }

}
