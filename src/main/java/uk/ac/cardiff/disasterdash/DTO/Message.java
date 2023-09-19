package uk.ac.cardiff.disasterdash.DTO;

public class Message {
    private int code; // 200
    private String message;
    private Object data;

    public Message(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public Message() {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
