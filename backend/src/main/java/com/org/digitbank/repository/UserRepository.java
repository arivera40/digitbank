package com.org.digitbank.repository;

import com.org.digitbank.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {

	@Query(value = "SELECT u FROM User u " + "WHERE u.email = :email")
	Optional<User> findByEmail(@Param("email") String email);

	@Query(value = "SELECT u FROM User u " + "WHERE u.phoneNumber = :phoneNumber")
	Optional<User> findByPhoneNumber(@Param("phoneNumber") String phoneNumber);

	Boolean existsByEmail(String email);
}
