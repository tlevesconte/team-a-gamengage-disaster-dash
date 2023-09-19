package uk.ac.cardiff.disasterdash;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import uk.ac.cardiff.disasterdash.model.ApplicationUser;
import uk.ac.cardiff.disasterdash.model.Role;
import uk.ac.cardiff.disasterdash.repository.UserRepository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class UserRepositoryUnitTest {

    @Autowired
    private UserRepository userRepositoryTest;

    @AfterEach
    void removeData() {
        userRepositoryTest.deleteAll();
    }

    @Test
    void findByUsernameIfUsernameExistsTest() {
        String username = "test_user";
        ApplicationUser user = new ApplicationUser(
                username,
                "password",
                Role.ADMIN
        );
        userRepositoryTest.save(user);
        boolean doesUserExistResult = userRepositoryTest.findByUsername(user.getUsername()).isPresent();
        assertThat(doesUserExistResult).isTrue();
    }

    @Test
    void findByUsernameIfUsernameDoesNotExistTest() {
        String username = "test_user";
        boolean doesUserExistResult = userRepositoryTest.findByUsername(username).isPresent();
        assertThat(doesUserExistResult).isFalse();
    }
}