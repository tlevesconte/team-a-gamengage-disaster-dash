package uk.ac.cardiff.disasterdash;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;
import uk.ac.cardiff.disasterdash.DTO.AdminQuizDTO;
import uk.ac.cardiff.disasterdash.DTO.QuizDTO;
import uk.ac.cardiff.disasterdash.controller.QuizController;
import uk.ac.cardiff.disasterdash.repository.QuizRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;

import static org.mockito.BDDMockito.given;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(QuizController.class)
public class LightweightMVCDataTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private QuizRepository quizRepo;

    @Test
    public void getQuestionTest() throws Exception{
        QuizDTO question = new QuizDTO(1,"storms",1,4,
                "test question","test choiceA","test choiceB",
                "test choiceC","test choiceD","test hint");
        given(this.quizRepo.getQuestion("storms","1")).willReturn((Arrays.asList(question)));

        this.mockMvc.perform(get("/GetQuestion")
                        .with(SecurityMockMvcRequestPostProcessors.user("user").roles("USER"))
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("type", "storms")
                        .param("questionIndex", "1"))
                        .andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().string(containsString("test question")));
    }

    @Test
    public void getAllQuestionsTest() throws Exception{
        AdminQuizDTO quiz = new AdminQuizDTO(1,"storms",1,4,
                "test question","test choiceA","test choiceB",
                "test choiceC","test choiceD","test answer","test hint");
        given(this.quizRepo.getAllQuiz("storms")).willReturn((Arrays.asList(quiz)));

        this.mockMvc.perform(get("/GetAllQuestions")
                        .with(SecurityMockMvcRequestPostProcessors.user("user").roles("USER"))
                        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                        .param("type", "storms"))
                        .andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(content().string(containsString("test question")));
    }

}
