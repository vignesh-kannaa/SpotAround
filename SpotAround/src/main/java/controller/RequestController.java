package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import model.ProvidersModel;
import model.RequestsModel;
import repository.ProvidersRepo;
import repository.RequestRepo;

@RestController
@CrossOrigin
public class RequestController {

	@Autowired
	RequestRepo reqRepo;
	@Autowired
	ProvidersRepo provRepo;
	@PostMapping("/saveRequest")
	public String saveRequest(@RequestBody RequestsModel request) {
		
		//since ionic time is set with current date -> updating the time to selected date 
		String requestedDate=request.getStartDate().substring(0, request.getStartDate().indexOf('T'));
		String requestedStartTime=requestedDate.concat(request.getStartTime().substring(request.getStartTime().indexOf('T'),request.getStartTime().length()));
		String requestedEndTime=requestedDate.concat(request.getEndTime().substring(request.getEndTime().indexOf('T'),request.getEndTime().length()));
		request.setStartTime(requestedStartTime);
		request.setEndTime(requestedEndTime);
		reqRepo.save(request);
		
		return "Saved";
	}
	@GetMapping("/getRequest")
	public List<RequestsModel> requestentry(@RequestParam("id")String id) {
		return reqRepo.findByFromId(id);
		
	}
	@GetMapping("/getRequestToId")
	public List<RequestsModel> requestentryToid(@RequestParam("id")String id) {
		return reqRepo.findByToId(id);		
	}
	@PostMapping("/updateRequestStatus")
	public String updateRequestStatus(@RequestBody RequestsModel request) {
		if(request.getStatus().equals("CancelRequest")) {
			reqRepo.cancelRequest(request.getFromId(), request.getToId(), request.getStartDate());
			
		}
/*		INCREASING THE HIRING COUNT 		*/
		else if(request.getStatus().equals("Completed")){
			reqRepo.updateStatus(request.getFromId(), request.getToId(), request.getStartDate(), request.getStatus());
			ProvidersModel provdata=provRepo.findByEmail(request.getToId());
			if(provdata.getHiredTimes()==null) {
				provdata.setHiredTimes(1);
			}
			else {
				provdata.setHiredTimes(provdata.getHiredTimes()+1);
			}
			provRepo.save(provdata);
			
		}
		else {
			reqRepo.updateStatus(request.getFromId(), request.getToId(), request.getStartDate(), request.getStatus());
			
		}		
		return request.getStatus();
	}
}
