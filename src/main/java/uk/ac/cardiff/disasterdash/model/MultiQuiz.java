package uk.ac.cardiff.disasterdash.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MultiQuiz {
    p1click(1),p2click(2);

    private Integer value;
}
