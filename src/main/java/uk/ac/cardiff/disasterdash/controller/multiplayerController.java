package uk.ac.cardiff.disasterdash.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.ac.cardiff.disasterdash.DTO.ConnectRequest;
import uk.ac.cardiff.disasterdash.DTO.Game;
import uk.ac.cardiff.disasterdash.DTO.Player;
import uk.ac.cardiff.disasterdash.exception.InvalidGameException;
import uk.ac.cardiff.disasterdash.exception.InvalidParamException;
import uk.ac.cardiff.disasterdash.exception.NotFoundException;
import uk.ac.cardiff.disasterdash.model.GamePlay;
import uk.ac.cardiff.disasterdash.service.GameService;

@RestController
@Slf4j
@AllArgsConstructor
@RequestMapping("/multigame")
public class multiplayerController {

    private final GameService gameService;
    private final SimpMessagingTemplate simpMessagingTemplate;

//    Create game instance
    @PostMapping("/start")
    public ResponseEntity<Game> start(@RequestBody Player player){
        log.info("start game request: {}", player);
        return ResponseEntity.ok(gameService.createGame(player));
    }

//    Connect to a specific game using generated gameID
    @PostMapping("/connect")
    public ResponseEntity<Game> connect(@RequestBody ConnectRequest request) throws InvalidParamException, InvalidGameException {
        log.info("connect request: {}", request);
        return ResponseEntity.ok(gameService.connectToGame(request.getPlayer(), request.getGameId()));
    }

//    Connect to a random game that has already been created
    @PostMapping("/connectrandom")
    public ResponseEntity<Game> connectRandom(@RequestBody Player player) throws NotFoundException {
        log.info("connect random {}", player);
        return ResponseEntity.ok(gameService.connectToRandomGame(player));
    }

//    retrieve in
    @PostMapping("/gameplay")
    public ResponseEntity<Game> gamePlay(@RequestBody GamePlay request) throws NotFoundException, InvalidGameException {
        log.info("gameplay: {}", request);
        Game game = gameService.gamePlay(request);
        simpMessagingTemplate.convertAndSend("/topic/game-progress/" + game.getGameId(), game);
        return ResponseEntity.ok(game);
    }
}
