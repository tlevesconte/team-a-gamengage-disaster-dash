package uk.ac.cardiff.disasterdash.model;

import org.springframework.jdbc.core.RowMapper;
import uk.ac.cardiff.disasterdash.DTO.AdminQuizDTO;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AdminQuizMapper implements RowMapper {
    @Override
    public Object mapRow(ResultSet rs, int rowNumber) throws SQLException {
        return new AdminQuizDTO(rs.getInt("ID"),
                rs.getString("type"),
                rs.getInt("questionIndex"),
                rs.getInt("choiceNum"),
                rs.getString("question"),
                rs.getString("choiceA"),
                rs.getString("choiceB"),
                rs.getString("choiceC"),
                rs.getString("choiceD"),
                rs.getString("correct"),
                rs.getString("hint")
        );
    }
}
