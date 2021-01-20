package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.LogIn;
import model.SignUp;
import model.Users;
import repository.LogInRepo;
import repository.UsersRepo;

@RestController
@CrossOrigin
public class AuthenticateController {

	
	@Autowired
	LogInRepo loginrepo;

	
	@Autowired
	UsersRepo userRepo;
	
	

	//SIGNUP METHOD
	
	@PostMapping("/signup")
	public Users signup(@RequestBody SignUp user) {
		
		if(loginrepo.findByEmail(user.getEmail())==null){
			
			System.out.println("new email");
			LogIn loginmodel=new LogIn();
			loginmodel.setEmail(user.getEmail());
			loginmodel.setPassword(user.getPassword());
			
			Users usermodel = new Users();
			usermodel.setEmail(user.getEmail());
			usermodel.setFirstName(user.getFirstName());
			usermodel.setLastName(user.getLastName());
			
			loginrepo.save(loginmodel);
			userRepo.save(usermodel);
			return usermodel;
		}
		return null;		
	}
	
	
	//LOGIN METHOD
	
	@PostMapping("/login")
	public Users login(@RequestBody LogIn user) {
		
		LogIn login=new LogIn();
		login=loginrepo.findByEmail(user.getEmail());
		if(login!=null){
			if(login.getPassword().equals(user.getPassword())){
				return userRepo.findByEmail(login.getEmail());
			}
		}
		
		return null;
	}
	
	//SOCIAL LOGIN
	
	@PostMapping("/socialLogin")
	public Users socialLogin(@RequestBody Users userdetails) {
		if(userdetails.getEmail()!=null) {
			if(userRepo.findByEmail(userdetails.getEmail())==null) {
				Users usermodel = new Users();
				usermodel.setEmail(userdetails.getEmail());
				usermodel.setFirstName(userdetails.getFirstName());
				usermodel.setLastName(userdetails.getLastName());
				usermodel.setProfilePath(userdetails.getProfilePath());
				userRepo.save(usermodel);
				return usermodel;
			}
			else {
				return userRepo.findByEmail(userdetails.getEmail());
			}
		}
		return null;
	}
	
	// CHANGE/UPDATE PASSWORD
	
	@PostMapping("/changePassword")
	public String changepassword(@RequestBody LogIn logindata,@RequestParam("pass") String pass) {
		
		LogIn user=loginrepo.findByEmail(logindata.getEmail());
		if(user.getPassword().equals(logindata.getPassword())) {
			loginrepo.updatepassword(pass, logindata.getEmail());
			return "success";
		}
		return "Incorrect";
	}
	
	//Intro screen validation
	@GetMapping("/userCheck")
	public Boolean checkUserAvailability(@RequestParam("userId") String userid) {
		if(userid!=null) {
			if(userRepo.findByEmail(userid)==null) {
				return true;
			}
			else {
				return false;
			}
		}else {
			return null;
		}
	}
}

