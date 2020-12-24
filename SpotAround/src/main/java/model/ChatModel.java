package model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;



@Entity
@Table(name="chatDetails")
public class ChatModel {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private int id;
		private String fromId;
		private String toId;
		@Lob
		@Column
		private String message;
		@Column(nullable = false, updatable = false)
		@Temporal(TemporalType.TIMESTAMP)
		private Date created_time;
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
		public String getMessage() {
			return message;
		}
		public void setMessage(String message) {
			this.message = message;
		}
		public Date getCreated_time() {
			return created_time;
		}
		public void setCreated_time(Date created_time) {
			this.created_time = created_time;
		}
		@Override
		public String toString() {
			return "ChatModel [id=" + id + ", fromId=" + fromId + ", toId=" + toId + ", message=" + message
					+ ", created_time=" + created_time + "]";
		}
		
		
}
