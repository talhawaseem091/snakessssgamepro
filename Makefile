CC = g++
CFLAGS = -Wall -std=c++11
LDFLAGS = -lraylib -lGL -lm -lpthread -ldl -lrt -lX11

all: snake

snake: main.cpp
	$(CC) $(CFLAGS) main.cpp -o snake $(LDFLAGS)

clean:
	rm -f snake

run: snake
	./snake
