package uk.ac.cardiff.disasterdash.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import uk.ac.cardiff.disasterdash.DTO.Game;
import uk.ac.cardiff.disasterdash.DTO.Player;
import uk.ac.cardiff.disasterdash.exception.InvalidGameException;
import uk.ac.cardiff.disasterdash.exception.InvalidParamException;
import uk.ac.cardiff.disasterdash.exception.NotFoundException;
import uk.ac.cardiff.disasterdash.model.GamePlay;
import uk.ac.cardiff.disasterdash.storage.GameStorage;

import java.util.UUID;

import static uk.ac.cardiff.disasterdash.DTO.GameStatus.*;

@Service
@AllArgsConstructor
public class GameService {
//    Create game instance and create random id number for game and set player 1
    public Game createGame(Player player) {
        Game game = new Game();
        game.setGameId(UUID.randomUUID().toString());
        game.setPlayer1(player);
        game.setStatus(NEW);

        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game connectToGame(Player player2, String gameId) throws InvalidParamException, InvalidGameException {
        if (GameStorage.getInstance().getGames().containsKey(gameId)) {
            throw new InvalidParamException("Game with that Id doesn't exist");
        }
        Game game = GameStorage.getInstance().getGames().get(gameId);
//        if game already has player2, then another player can't join
        if(game.getPlayer2() != null){
            throw new InvalidGameException("Game not valid");
        }
        game.setPlayer2(player2);
        game.setStatus(IN_PROGRESS);
        GameStorage.getInstance().setGame(game);
        return game;
    }

    public Game connectToRandomGame(Player player2) throws NotFoundException {
       Game game = GameStorage.getInstance().getGames().values().stream()
               .filter(it-> it.getStatus().equals(NEW))
               .findFirst().orElseThrow(()-> new NotFoundException("Game not found"));
       game.setPlayer2(player2);
       game.setStatus(IN_PROGRESS);
       GameStorage.getInstance().setGame(game);
       return game;
    }

    public Game gamePlay(GamePlay gamePlay) throws NotFoundException, InvalidGameException {
        if(!GameStorage.getInstance().getGames().containsKey(gamePlay.getGameId())){
            throw new NotFoundException("Game not Found");
        }
        Game game = GameStorage.getInstance().getGames().get(gamePlay.getGameId());

        if(game.getStatus().equals(FINISHED)){
            throw new InvalidGameException("Game already finished");
        }

        System.out.println(game);

        GameStorage.getInstance().setGame(game);
        return game;
    }


}