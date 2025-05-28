function useChatHistory(initialChats = []) {
        try {
            const storedChats = localStorage.getItem('chatHistory');
            return storedChats ? JSON.parse(storedChats) : initialChats;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return initialChats;
        }
    };

const datachat = useChatHistory();
console.log(datachat)
