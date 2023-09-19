package uk.ac.cardiff.disasterdash.DTO;

import lombok.Data;

@Data
public class ConnectRequest {
    private  Player player;
    private  String gameId;
}
