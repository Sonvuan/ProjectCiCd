package com.backend.timkiemdong.mapper;

import com.backend.timkiemdong.dto.RoleDto;
import com.backend.timkiemdong.entity.Permission;
import com.backend.timkiemdong.entity.Role;
import jakarta.validation.groups.Default;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface RoleMapper {

    Role toDto(RoleDto roleDto);

    RoleDto toEntity(Role role);


}
