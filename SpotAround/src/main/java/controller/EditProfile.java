package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import model.Users;
import repository.UsersRepo;

@RestController
@CrossOrigin
public class EditProfile {

	@Autowired
	UsersRepo userRepo;

	@PostMapping("/editUserName")
	public Users editUsername(@RequestBody Users user) {
		
		Users userdata=userRepo.findByEmail(user.getEmail());
			userdata.setFirstName(user.getFirstName());
			userdata.setLastName(user.getLastName());
			userdata.setProfilePath(user.getProfilePath());
		userRepo.save(userdata);
		
		return userdata;
	}
}
