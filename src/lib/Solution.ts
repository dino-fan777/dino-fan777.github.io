export class Solution {
    private content: string;
  
    constructor() {
      this.content = ''; // Initialize content
    }
  
    async load(filePath: string): Promise<void> {
      try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Failed to fetch file');
        this.content = await response.text();
      } catch (error) {
        console.error('Error loading file:', error);
        this.content = 'Error loading file content';
      }
    }
  
    getContent(): string {
      return this.content;
    }
  }
  