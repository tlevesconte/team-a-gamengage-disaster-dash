package uk.ac.cardiff.disasterdash.model;

import org.springframework.jdbc.core.RowMapper;
import uk.ac.cardiff.disasterdash.DTO.QuizDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class QuizMapper implements RowMapper {
    @Override
    public Object mapRow(ResultSet rs, int rowNumber) throws SQLException {
        return new QuizDTO(rs.getInt("ID"),
                rs.getString("type"),
                rs.getInt("questionIndex"),
                rs.getInt("choiceNum"),
                rs.getString("question"),
                rs.getString("choiceA"),
                rs.getString("choiceB"),
                rs.getString("choiceC"),
                rs.getString("choiceD"),
                rs.getString("hint")
        );
    }
}
