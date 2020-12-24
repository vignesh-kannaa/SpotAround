package model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Requests")
public class RequestsModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String fromId;
	private String toId;
	private String startDate;
	private String startTime;
	private String endTime;
	private String reqState;
	private String reqCity;
	private String message;
	private String status;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFromId() {
		return fromId;
	}
	public void setFromId(String fromId) {
		this.fromId = fromId;
	}
	public String getToId() {
		return toId;
	}
	public void setToId(String toId) {
		this.toId = toId;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
	public String getReqState() {
		return reqState;
	}
	public void setReqState(String reqState) {
		this.reqState = reqState;
	}
	public String getReqCity() {
		return reqCity;
	}
	public void setReqCity(String reqCity) {
		this.reqCity = reqCity;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "RequestsModel [id=" + id + ", fromId=" + fromId + ", toId=" + toId + ", startDate=" + startDate
				+ ", startTime=" + startTime + ", endTime=" + endTime + ", reqState=" + reqState + ", reqCity="
				+ reqCity + ", message=" + message + ", status=" + status + "]";
	}

	
	
	
}
