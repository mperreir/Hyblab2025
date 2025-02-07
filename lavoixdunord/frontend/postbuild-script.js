const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const basename = (process.env.REACT_APP_BASENAME || "lavoixdunord/");
const questionsFilePath = path.join(__dirname, 'build', 'data/questions.yaml');

try {
    // Read the YAML file
    const fileContents = fs.readFileSync(questionsFilePath, 'utf8');
    const data = yaml.load(fileContents);

    // Function to add basename to each image
    const addBasenameToImages = (questions) => {
        return questions.map(question => {
            if (question.hints && question.hints.image) {
                question.hints.image = `${basename}${question.hints.image}`;
            }
            if (question.map && question.map.image) {
                question.map.image = `${basename}${question.map.image}`;
            }
            return question;
        });
    };

    // Iterate through the levels and stages to update images
    data.game.levels.forEach(level => {
        level.stages.forEach(stage => {
            stage.questions = addBasenameToImages(stage.questions);
        });
    });

    // Write the updated YAML back to the file
    const newYaml = yaml.dump(data);
    fs.writeFileSync(questionsFilePath, newYaml, 'utf8');

    console.log('Basename added to all images successfully!');
} catch (e) {
    console.error('Error processing the YAML file:', e);
}