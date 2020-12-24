package model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


	@Entity
	@Table(name="Feedback")
	public class FeedBackModel {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private int id;
		private String fromId;
		private String toId;
		private String review;
		private float rating;
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
		public String getReview() {
			return review;
		}
		public void setReview(String review) {
			this.review = review;
		}
		public float getRating() {
			return rating;
		}
		public void setRating(float rating) {
			this.rating = rating;
		}
		@Override
		public String toString() {
			return "FeedBackModel [id=" + id + ", fromId=" + fromId + ", toId=" + toId + ", review=" + review
					+ ", rating=" + rating + "]";
		}
		
}
