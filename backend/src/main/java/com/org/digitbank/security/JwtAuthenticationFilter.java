package com.org.digitbank.security;

import java.io.IOException;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.org.digitbank.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String userEmail;

        System.out.println(authHeader);
        // Check if we have the JWT token.
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        	System.out.println("Does not contain header.");
            filterChain.doFilter(request, response);
            return;
        }

        // Extract token from authentication header.
        jwt = authHeader.substring(7);
        System.out.println("userEmail = " + jwt);
        // Extract userEmail from token.
        userEmail = jwtService.extractUsername(jwt);
        
        // Validate user if a user is not already connected.
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Check if user exists in database.
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // Check if token is still valid.
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // Update the SecurityContextHolder and send the request to DispatcherServlet.
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            	System.out.println("Sets token inside SecurityContextHolder");
            }
        }
        // Pass to the next filter.
        filterChain.doFilter(request, response);
    }
}
