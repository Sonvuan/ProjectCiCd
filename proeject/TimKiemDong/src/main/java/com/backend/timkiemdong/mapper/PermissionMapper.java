package com.backend.timkiemdong.mapper;

import com.backend.timkiemdong.dto.ParaCurrencyRateDto;
import com.backend.timkiemdong.dto.PermissionDto;
import com.backend.timkiemdong.entity.ParaCurrencyRate;
import com.backend.timkiemdong.entity.Permission;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PermissionMapper {

    PermissionDto toDto(Permission permission);
    Permission toEntity(PermissionDto permissionDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    void updateEntityFromDto(PermissionDto dto, @MappingTarget Permission entity);


}
