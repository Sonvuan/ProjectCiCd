package com.backend.timkiemdong.service;

import com.backend.timkiemdong.dto.AcountRequest;
import com.backend.timkiemdong.dto.AcountResponse;
import com.backend.timkiemdong.dto.AuthResponse;
import com.backend.timkiemdong.dto.LoginRequest;
import com.backend.timkiemdong.entity.Acount;

import java.util.List;

public interface AcountService {
    AcountResponse list(AcountResponse acountResponse);
    AuthResponse login(LoginRequest loginRequest);
    AcountResponse createAcount(AcountRequest accountRequest);
    AcountResponse updateAcount(AcountRequest acountRequest);
    void deleteAcount(AcountRequest acountRequest);

}
