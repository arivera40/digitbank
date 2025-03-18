package com.org.digitbank.controller;

import java.math.BigDecimal;
import java.net.URI;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.org.digitbank.model.Account;
import com.org.digitbank.model.AccountType;
import com.org.digitbank.model.Role;
import com.org.digitbank.model.User;
import com.org.digitbank.payload.ApiResponse;
import com.org.digitbank.payload.JwtAuthenticationResponse;
import com.org.digitbank.payload.LoginRequest;
import com.org.digitbank.payload.RegisterRequest;
import com.org.digitbank.repository.AccountRepository;
import com.org.digitbank.repository.UserRepository;
import com.org.digitbank.service.JwtService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {
	private final UserRepository userRepository;
	private final AccountRepository accountRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
		System.out.println(registerRequest.getFirstName());
		System.out.println(registerRequest.getLastName());
		System.out.println(registerRequest.getEmail());
		System.out.println(registerRequest.getPhoneNumber());
		System.out.println(registerRequest.getPassword());

		if (userRepository.existsByEmail(registerRequest.getEmail())) {
			return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
		}
		User user = User.builder().firstName(registerRequest.getFirstName()).lastName(registerRequest.getLastName())
				.email(registerRequest.getEmail()).password(passwordEncoder.encode(registerRequest.getPassword()))
				.phoneNumber(registerRequest.getPhoneNumber()).role(Role.USER).build();

		User userResult = userRepository.save(user);

		String jwt = jwtService.generateToken(userResult);

		System.out.println("(register) JWT Token: " + jwt);

		Authentication authentication = new UsernamePasswordAuthenticationToken(userResult.getEmail(),
				registerRequest.getPassword());
		SecurityContextHolder.getContext().setAuthentication(authentication);

		Account account = Account.builder().userId(userResult.getUserId()).accountType(AccountType.CHECKING)
				.balance(new BigDecimal(0)).build();
		
		Account accountResult = accountRepository.save(account);

		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
		System.out.println(loginRequest.getEmail());
		System.out.println(loginRequest.getPassword());

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
		String jwt = jwtService.generateToken(user);

		System.out.println("(login) JWT Token: " + jwt);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
	}

	@GetMapping("/bank/home")
	public ResponseEntity<List<String>> home() {
		return ResponseEntity.ok(Arrays.asList("hello", "world"));
	}
}
