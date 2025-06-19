class VoiceTradingBot {
    constructor() {
        this.isRecording = false;
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.transcript = document.getElementById('transcript');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.status = document.getElementById('status');
        
        this.initializeEventListeners();
        this.initializeSpeechRecognition();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.startConversation());
        this.stopBtn.addEventListener('click', () => this.stopConversation());
    }
    
    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            
            this.recognition.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    this.addToTranscript('User: ' + finalTranscript);
                }
            };
        }
    }
    
    async startConversation() {
        try {
            this.status.textContent = 'Starting conversation...';
            const response = await fetch('/start_call', { method: 'POST' });
            const data = await response.json();
            
            if (data.status === 'success') {
                this.isRecording = true;
                this.startBtn.disabled = true;
                this.stopBtn.disabled = false;
                this.status.textContent = 'Conversation active';
                this.recognition?.start();
            }
        } catch (error) {
            console.error('Error starting conversation:', error);
            this.status.textContent = 'Error starting conversation';
        }
    }
    
    stopConversation() {
        this.isRecording = false;
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.status.textContent = 'Conversation stopped';
        this.recognition?.stop();
    }
    
    addToTranscript(text) {
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.className = 'transcript-entry';
        entry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${text}`;
        this.transcript.appendChild(entry);
        this.transcript.scrollTop = this.transcript.scrollHeight;
    }
}

// Initialize the bot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new VoiceTradingBot();
});
