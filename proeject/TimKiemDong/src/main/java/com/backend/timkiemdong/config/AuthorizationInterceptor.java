package com.backend.timkiemdong.config;

import com.backend.timkiemdong.entity.Acount;
import com.backend.timkiemdong.entity.Permission;
import com.backend.timkiemdong.repository.AcountRepository;
import com.backend.timkiemdong.service.PermissionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AuthorizationInterceptor implements HandlerInterceptor {
    @Autowired
    private AcountRepository acountRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        String requestUrl = request.getRequestURI();

        boolean authorized = hasPermission(username, requestUrl);

        if (!authorized) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            response.getWriter().write("Bạn Không Có Quyền Truy Cap !");
            return false;
        }

        return true;
    }

    public boolean hasPermission(String username, String url) {
        Optional<Acount> accountOpt = acountRepository.findByEmail(username);
        if (accountOpt.isEmpty()) return false;

        Acount account = accountOpt.get();

        Set<String> allowedUrls = account.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .map(Permission::getUrl)
                .filter(u -> u != null && !u.isEmpty())  // 👈 tránh null gây crash
                .collect(Collectors.toSet());

        return allowedUrls.stream().anyMatch(url::startsWith);
    }



}
