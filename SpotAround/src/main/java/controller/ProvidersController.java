package controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import model.ProvidersModel;
import model.ProvidersPostModel;
import model.ProvidersSkillsModel;
import repository.ProvidersPostRepo;
import repository.ProvidersRepo;
import repository.ProvidersSkillsRepo;


@RestController
@CrossOrigin
public class ProvidersController {

	
	@Autowired
	ProvidersRepo provRepo;
	
	@Autowired
	ProvidersPostRepo postRepo;
	
	@Autowired
	ProvidersSkillsRepo provskillsRepo;
	
	@PostMapping("/saveProviderDetail")
	public String saveProviderDetail(@RequestBody ProvidersModel providerData) {
		
		ProvidersModel prov=provRepo.findByEmail(providerData.getEmail());
		if(prov==null){
			provRepo.save(providerData);	
			return "saved data";
		}
		prov.setFirstName(providerData.getFirstName());
		prov.setLastName(providerData.getLastName());
		prov.setDescription(providerData.getDescription());
		prov.setImagePath(providerData.getImagePath());
		prov.setState(providerData.getState());
		prov.setCity(providerData.getCity());
		prov.setCategory(providerData.getCategory());
		prov.setSubCategory(providerData.getSubCategory());		
		provRepo.save(prov);
		return "Updated";
	}
	
	@GetMapping("/getProviderDetail")
	public ProvidersModel getProviderDetail(@RequestParam("emailId") String emailId) {
		
		return provRepo.findByEmail(emailId);
	
	}
	@GetMapping("/getProviderbyCategory")
	public List<ProvidersModel> getProviderByCategory(@RequestParam("category") String cat) {
		return provRepo.findBySubCategory(cat);
	}
	
	@PostMapping("uploadPost")
	public List<ProvidersPostModel> uploadPosts(@RequestBody ProvidersPostModel pp) throws IOException {
		
		postRepo.save(pp);
		return postRepo.findByEmail(pp.getEmail());
		
	}
	@GetMapping("getPostCount")
	public Boolean getPostsCount(@RequestParam("id") String id) throws IOException {
		
		int count=postRepo.countPost(id);
		System.out.println("count:"+count);
		if(count>=5) {
			return false;
		}
		return true;
		
	}
	
	@GetMapping("getPost")
	public List<ProvidersPostModel> getPosts(@RequestParam("id") String id) throws IOException {
		
		return postRepo.findByEmail(id);
		
	}
	@PostMapping("deletePost")
	public String deletePost(@RequestBody ProvidersPostModel pp) {
		postRepo.deletePost(pp.getEmail(),pp.getPic());
		return "Delete successfully";
	}
	
	
	@PostMapping("updateSkills")
	public String updateSkills(@RequestBody List<ProvidersSkillsModel> skills){
		System.out.println("inside the update skills: "+skills.get(0));
		if(provskillsRepo.findByEmail(skills.get(0).getEmail())!=null) {
			provskillsRepo.deleteByEmail(skills.get(0).getEmail());
		}
		for(int i=0;i<skills.size();i++) {
			if(skills.get(i)!=null && skills.get(i).getSkills()!="") {
				System.out.println(skills.get(i));
			provskillsRepo.save(skills.get(i));
			}
		}
		return "saved";
	}
	@GetMapping("/getSkills")
	public List<ProvidersSkillsModel> getSkills(@RequestParam("id") String id){
		return provskillsRepo.findByEmail(id);
		
	}
	
}
