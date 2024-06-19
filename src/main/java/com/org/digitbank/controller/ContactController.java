package com.org.digitbank.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.digitbank.model.Contact;
import com.org.digitbank.model.User;
import com.org.digitbank.payload.ContactRequest;
import com.org.digitbank.repository.ContactRepository;
import com.org.digitbank.repository.UserRepository;
import com.org.digitbank.service.JwtService;
import com.org.digitbank.payload.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ContactController {
	private final ContactRepository contactRepository;
	private final UserRepository userRepository;
	private final JwtService jwtService;

	@RequestMapping("/bank/getContacts")
	public ResponseEntity<List<Contact>> getContacts(@RequestHeader("Authorization") String authHeader) {
		System.out.println("getContacts");
		// Extract JWT token from Authorization header
		String jwtToken = authHeader.substring(7);

		// Extract user id from JWT token
		Integer userId = jwtService.extractClaim(jwtToken, claims -> claims.get("userId", Integer.class));

		System.out.println(userId);

		List<Contact> contacts = contactRepository.findByUserId(userId);

		return ResponseEntity.ok(contacts);
	}

	@PostMapping("/bank/createContact")
	public ResponseEntity<?> createContact(@RequestHeader("Authorization") String authHeader,
			@Valid @RequestBody ContactRequest contactRequest) {
		System.out.println("createContact");
		// Extract JWT token from Authorization header
		String jwtToken = authHeader.substring(7);

		// Extract user id from JWT token
		Integer userId = jwtService.extractClaim(jwtToken, claims -> claims.get("userId", Integer.class));

		Optional<User> optionalUserByPhoneNumber = userRepository.findByPhoneNumber(contactRequest.getPhoneNumber());
		Optional<User> optionalUserByEmail = userRepository.findByEmail(contactRequest.getEmail());

		Contact contact;
		// Valid phone number and email are passed in request.
		if (optionalUserByPhoneNumber.isPresent() && optionalUserByEmail.isPresent()) {
			User userByPhoneNumber = optionalUserByPhoneNumber.get();
			User userByEmail = optionalUserByEmail.get();

			// Phone number and Email are associated to different users.
			if (!userByPhoneNumber.equals(userByEmail)) {
				return new ResponseEntity(new ApiResponse(false, "User Mismatch!"), HttpStatus.BAD_REQUEST);
			}

			contact = Contact.builder().userId(userId).recipientId(userByEmail.getUserId())
					.contactName(contactRequest.getContactName()).phoneNumber(contactRequest.getPhoneNumber())
					.email(contactRequest.getEmail()).build();
		// Valid Phone number is passed in request.
		} else if (optionalUserByPhoneNumber.isPresent()) {
			User userByPhoneNumber = optionalUserByPhoneNumber.get();

			contact = Contact.builder().userId(userId).recipientId(userByPhoneNumber.getUserId())
					.contactName(contactRequest.getContactName()).phoneNumber(contactRequest.getPhoneNumber())
					.build();
		// Valid Email is passed in request.
		} else if (optionalUserByEmail.isPresent()) {
			User userByEmail = optionalUserByEmail.get();
			
			contact = Contact.builder().userId(userId).recipientId(userByEmail.getUserId())
					.contactName(contactRequest.getContactName()).phoneNumber(contactRequest.getPhoneNumber())
					.build();
		// No valid arguments passed.
		} else {
			return new ResponseEntity(new ApiResponse(false, "No registered user found!"), HttpStatus.BAD_REQUEST);
		}
		return ResponseEntity.ok(contactRepository.save(contact));
	}
}
