<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="css/bootstrap.css">
</head>
<meta charset="ISO-8859-1">
<title>Digit Banking Registration</title>
</head>
<body>
	<div class="main-container container-fluid registration">
		<form action="register" method="post" modelAttribute="user">
			<h1>Register Today!</h1>
			<p>Please fill out the fields below to create an account.</p>
			<div class="form-container">
				<div class="form-input">
					<label for="first_name">First Name</label>
					<input type="text" id="first_name" name="first_name" required>
				</div>
				<div class="form-input">
					<label for="last_name">Last Name</label>
					<input type="text" id="last_name" name="last_name" required>
				</div>
				<div class="form-input">
					<label for="email">Email</label>
					<input type="text" id="email" name="email" required>
				</div>
				<div class="form-input">
					<label for="phone_number">Phone Number (Optional)</label>
					<input type="text" id="phone_number" name="phone_number">
				</div>
				<div class="form-input">
					<label for="password">Password</label>
					<input type="password" id="password" name="password" required>
				</div>
				<div class="form-input">
					<label for="confirm_password">Confirm Password</label>
					<input type="password" id="confirm_password" name="confirm_password" required>
				</div>
				<div class="form-action">
					<button type="submit">Register</button>
				</div>
			</div>
		</form>
	</div>
</body>
</html>