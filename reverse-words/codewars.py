def spin_words(sentence):
    wordList = sentence.split(" ")
    for i in range(0, len(wordList)):
        word = wordList[i]
        if len(word) >= 5:
            wordList[i] = word[::-1]
    return " ".join(wordList)


assert spin_words("Hello my name is Timothy") == "olleH my name is yhtomiT"
