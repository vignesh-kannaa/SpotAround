package controller;

import java.text.DecimalFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.FeedBackModel;
import model.ProvidersModel;
import repository.FeedbackRepo;
import repository.ProvidersRepo;



@RestController
@CrossOrigin
public class FeedBackController {

	
	@Autowired
	FeedbackRepo fbRepo;

	@Autowired
	ProvidersRepo provRepo;
	
	@GetMapping("/getFeedbackFromId")
	public List<FeedBackModel> getFeedbackFromId(@RequestParam("id")String id) {
	 
		return fbRepo.findByfromId(id);
	}
	@GetMapping("/getFeedbackToId")
	public List<FeedBackModel> getFeedbackToId(@RequestParam("id")String id) {
	 
		return fbRepo.findBytoId(id);
	}
	@PostMapping("/saveFeedback")
	public String saveFeedback(@RequestBody FeedBackModel fb) {
		
/*		TO GET ONLY ONE DECIMAL POINT  */
		DecimalFormat df = new DecimalFormat();
		df.setMaximumFractionDigits(1);
				
		fbRepo.save(fb);
/*		SAVE THE RATINGS IN THE RESPECTIVE PROVIDERS	*/
		ProvidersModel provider=provRepo.findByEmail(fb.getToId());
		if(provider.getRatings()==null) {
			provider.setRatings(fb.getRating());
		}else {
			provider.setRatings( Float.valueOf(df.format((provider.getRatings()+fb.getRating())/2)));
		}
		provRepo.save(provider);
		return "Saved";
	}
	@GetMapping("/getFeedback")
	public boolean getFeedback(@RequestParam("fromId")String fromId,@RequestParam("toId")String toId) {
	 
		if(fbRepo.findFeedback(fromId, toId)!=null) {
			return true;
		}
		return false;
		
	}
}
