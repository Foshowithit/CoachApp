#!/usr/bin/env node
/**
 * Knowledge Base Processor for Tod Lee Video Scripts
 * Usage: node knowledge-processor.js [command] [options]
 */

const fs = require('fs');
const path = require('path');

class KnowledgeProcessor {
    constructor() {
        this.knowledgeDir = './src/lib/knowledge-base';
        this.outputFile = './src/lib/knowledge-base.ts';
        this.ensureDirectories();
    }

    ensureDirectories() {
        if (!fs.existsSync(this.knowledgeDir)) {
            fs.mkdirSync(this.knowledgeDir, { recursive: true });
        }
    }

    /**
     * Add new video script content
     */
    addVideoScript(scriptContent, title = null) {
        const timestamp = new Date().toISOString().slice(0, 10);
        const filename = title ? 
            `${timestamp}-${title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}.txt` :
            `${timestamp}-video-script.txt`;
        
        const filepath = path.join(this.knowledgeDir, filename);
        
        // Add metadata header
        const processedContent = `=== VIDEO SCRIPT: ${title || 'Untitled'} ===
Date Added: ${new Date().toISOString()}

${scriptContent}

=== END SCRIPT ===
`;

        fs.writeFileSync(filepath, processedContent);
        console.log(`✅ Added video script: ${filename}`);
        return filename;
    }

    /**
     * Process and extract key protocols from script
     */
    extractProtocols(scriptContent) {
        const protocols = {
            testosterone: [],
            compounds: [],
            dosages: [],
            bloodwork: [],
            training: [],
            nutrition: []
        };

        const lines = scriptContent.split('\n');
        
        for (const line of lines) {
            const lowerLine = line.toLowerCase();
            
            // Extract testosterone protocols
            if (lowerLine.includes('testosterone') || lowerLine.includes('test')) {
                if (lowerLine.match(/\d+\s*mg/)) {
                    protocols.testosterone.push(line.trim());
                }
            }
            
            // Extract compound mentions
            const compounds = ['tren', 'deca', 'masteron', 'anavar', 'primo', 'eq', 'winstrol'];
            for (const compound of compounds) {
                if (lowerLine.includes(compound)) {
                    protocols.compounds.push(line.trim());
                    break;
                }
            }
            
            // Extract dosages
            if (lowerLine.match(/\d+\s*mg|units?\s+gh|iu/)) {
                protocols.dosages.push(line.trim());
            }
            
            // Extract bloodwork mentions
            if (lowerLine.includes('blood') || lowerLine.includes('lab') || lowerLine.includes('test')) {
                protocols.bloodwork.push(line.trim());
            }
            
            // Extract training info
            if (lowerLine.includes('train') || lowerLine.includes('workout') || lowerLine.includes('reps')) {
                protocols.training.push(line.trim());
            }
            
            // Extract nutrition
            if (lowerLine.includes('protein') || lowerLine.includes('carb') || lowerLine.includes('meal')) {
                protocols.nutrition.push(line.trim());
            }
        }
        
        return protocols;
    }

    /**
     * Consolidate all knowledge base files
     */
    consolidateKnowledge() {
        const files = fs.readdirSync(this.knowledgeDir).filter(f => f.endsWith('.txt'));
        
        let consolidatedKnowledge = `// Tod Lee Knowledge Base - Consolidated from ${files.length} video scripts
export const TOD_LEE_KNOWLEDGE = \`
=== COMPREHENSIVE TOD LEE KNOWLEDGE BASE ===
Generated: ${new Date().toISOString()}
Sources: ${files.length} video scripts

`;

        // Read and combine all knowledge files
        for (const file of files) {
            const content = fs.readFileSync(path.join(this.knowledgeDir, file), 'utf8');
            consolidatedKnowledge += content + '\n\n';
        }

        consolidatedKnowledge += `\`;

export function getKnowledgeBasePrompt(userMessage: string): string {
  return \`You are Tod Lee (Adam), a Pro bodybuilder and performance coach speaking to experienced bodybuilders and fitness enthusiasts.

IMPORTANT: All advice is for research and entertainment purposes only. Always recommend consulting healthcare professionals.

KNOWLEDGE BASE:
\${TOD_LEE_KNOWLEDGE}

Your personality is direct, technical, and no-nonsense. Give specific protocols, dosages, and real-world advice based on your documented experience. Don't oversimplify - your audience understands bodybuilding concepts.

User message: \${userMessage}\`;
}`;

        fs.writeFileSync(this.outputFile, consolidatedKnowledge);
        console.log(`✅ Consolidated ${files.length} files into knowledge base`);
        console.log(`📄 Output: ${this.outputFile}`);
    }

    /**
     * Show knowledge base statistics
     */
    showStats() {
        const files = fs.readdirSync(this.knowledgeDir).filter(f => f.endsWith('.txt'));
        
        console.log('\n📊 KNOWLEDGE BASE STATISTICS');
        console.log('═'.repeat(40));
        console.log(`Total Scripts: ${files.length}`);
        
        let totalLines = 0;
        let totalWords = 0;
        
        for (const file of files) {
            const content = fs.readFileSync(path.join(this.knowledgeDir, file), 'utf8');
            const lines = content.split('\n').length;
            const words = content.split(/\s+/).length;
            
            totalLines += lines;
            totalWords += words;
            
            console.log(`  ${file}: ${lines} lines, ${words} words`);
        }
        
        console.log('─'.repeat(40));
        console.log(`TOTALS: ${totalLines} lines, ${totalWords} words`);
        console.log('');
    }

    /**
     * Interactive script to add content
     */
    interactive() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('\n🎯 TOD LEE KNOWLEDGE BASE BUILDER');
        console.log('═'.repeat(40));
        console.log('Paste your video script content below.');
        console.log('Type "END" on a new line when finished.\n');

        rl.question('Enter video title (optional): ', (title) => {
            console.log('\nPaste script content:');
            
            let content = '';
            
            rl.on('line', (line) => {
                if (line.trim() === 'END') {
                    if (content.trim()) {
                        this.addVideoScript(content, title || null);
                        console.log('\n🔄 Rebuilding knowledge base...');
                        this.consolidateKnowledge();
                        console.log('\n✅ Knowledge base updated!');
                        this.showStats();
                    } else {
                        console.log('❌ No content provided');
                    }
                    rl.close();
                } else {
                    content += line + '\n';
                }
            });
        });
    }

    /**
     * List all knowledge files
     */
    listFiles() {
        const files = fs.readdirSync(this.knowledgeDir).filter(f => f.endsWith('.txt'));
        
        console.log('\n📁 KNOWLEDGE BASE FILES');
        console.log('═'.repeat(40));
        
        if (files.length === 0) {
            console.log('No knowledge files found.');
            return;
        }
        
        files.forEach((file, index) => {
            const filepath = path.join(this.knowledgeDir, file);
            const stats = fs.statSync(filepath);
            const size = Math.round(stats.size / 1024);
            
            console.log(`${index + 1}. ${file} (${size}KB, ${stats.mtime.toLocaleDateString()})`);
        });
        console.log('');
    }
}

// CLI Interface
const processor = new KnowledgeProcessor();

const command = process.argv[2];

switch (command) {
    case 'add':
        processor.interactive();
        break;
    
    case 'consolidate':
        processor.consolidateKnowledge();
        break;
    
    case 'stats':
        processor.showStats();
        break;
    
    case 'list':
        processor.listFiles();
        break;
    
    default:
        console.log(`
🎯 TOD LEE KNOWLEDGE BASE PROCESSOR

Usage: node knowledge-processor.js [command]

Commands:
  add         - Interactive script to add new video content
  consolidate - Rebuild the knowledge base from all files
  stats       - Show knowledge base statistics
  list        - List all knowledge files

Examples:
  node knowledge-processor.js add
  node knowledge-processor.js consolidate
  node knowledge-processor.js stats
        `);
}