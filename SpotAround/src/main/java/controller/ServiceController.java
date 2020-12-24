package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.CategoryModel;
import model.ProvidersModel;
import model.Users;
import repository.CategoryRepo;
import repository.LocationRepo;
import repository.ProvidersRepo;
import repository.UsersRepo;

@RestController
@CrossOrigin
public class ServiceController {

	@Autowired
	LocationRepo locRepo;
	@Autowired
	CategoryRepo catRepo;
	@Autowired
	UsersRepo userRepo;
	@Autowired
	ProvidersRepo providerRepo;
	

	@GetMapping("/getUserDetails")
	public Users getUsersDetails(@RequestParam("id")String id) {
		return userRepo.findByEmail(id);
	}
	
	/*API to get the State and City*/
	
	@GetMapping("/getStates")
	public List<String> getState() {
		List<String> states=locRepo.findStates();		
		return states;
	}

	@GetMapping("/getCities")
	public List<String> getCities(@RequestParam("state") String state) {		
		List<String> cities=locRepo.findCities(state);		
		return cities;
	}
	
	/*API to get the category and sub category*/
	@GetMapping("/getCategory")
	public List<CategoryModel> getCategory() {
		List<CategoryModel> categories=catRepo.findCategories();
		return categories;
	}

	@GetMapping("/getSubCategory")
	public List<String> getSubCategory(@RequestParam("category") String category) {
		List<String> subCategories=catRepo.findSubCategories(category);		
		return subCategories;
	}

	@GetMapping("/getFeaturedCategory")
	public List<CategoryModel> getFeaturedCategory() {
	
		List<CategoryModel> featuredCategories=catRepo.findFeaturedCategory();		
		return featuredCategories;
	}
	
	
	
}
