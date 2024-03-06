package com.org.digitbank.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private String accessToken;
    
    @Builder.Default
    private String tokenType = "Bearer";
    
    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
    }
}
