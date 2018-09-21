(function() {
  module.exports = {
    statusBar: null,
    activate: function() {},
    deactivate: function() {
      var ref;
      if ((ref = this.statusBarTile) != null) {
        ref.destroy();
      }
      return this.statusBarTile = null;
    },
    providePlatformIOIDETerminal: function() {
      return {
        updateProcessEnv: function(variables) {
          var name, results, value;
          results = [];
          for (name in variables) {
            value = variables[name];
            results.push(process.env[name] = value);
          }
          return results;
        },
        run: (function(_this) {
          return function(commands) {
            return _this.statusBarTile.runCommandInNewTerminal(commands);
          };
        })(this),
        getTerminalViews: (function(_this) {
          return function() {
            return _this.statusBarTile.terminalViews;
          };
        })(this),
        open: (function(_this) {
          return function() {
            return _this.statusBarTile.runNewTerminal();
          };
        })(this)
      };
    },
    provideRunInTerminal: function() {
      return {
        run: (function(_this) {
          return function(commands) {
            return _this.statusBarTile.runCommandInNewTerminal(commands);
          };
        })(this),
        getTerminalViews: (function(_this) {
          return function() {
            return _this.statusBarTile.terminalViews;
          };
        })(this)
      };
    },
    consumeStatusBar: function(statusBarProvider) {
      return this.statusBarTile = new (require('./status-bar'))(statusBarProvider);
    },
    config: {
      toggles: {
        type: 'object',
        order: 1,
        properties: {
          autoClose: {
            title: 'Close Terminal on Exit',
            description: 'Should the terminal close if the shell exits?',
            type: 'boolean',
            "default": false
          },
          cursorBlink: {
            title: 'Cursor Blink',
            description: 'Should the cursor blink when the terminal is active?',
            type: 'boolean',
            "default": true
          },
          runInsertedText: {
            title: 'Run Inserted Text',
            description: 'Run text inserted via `platformio-ide-terminal:insert-text` as a command? **This will append an end-of-line character to input.**',
            type: 'boolean',
            "default": true
          },
          selectToCopy: {
            title: 'Select To Copy',
            description: 'Copies text to clipboard when selection happens.',
            type: 'boolean',
            "default": true
          },
          loginShell: {
            title: 'Login Shell',
            description: 'Use --login on zsh and bash.',
            type: 'boolean',
            "default": true
          }
        }
      },
      core: {
        type: 'object',
        order: 2,
        properties: {
          autoRunCommand: {
            title: 'Auto Run Command',
            description: 'Command to run on terminal initialization.',
            type: 'string',
            "default": ''
          },
          mapTerminalsTo: {
            title: 'Map Terminals To',
            description: 'Map terminals to each file or folder. Default is no action or mapping at all. **Restart required.**',
            type: 'string',
            "default": 'None',
            "enum": ['None', 'File', 'Folder']
          },
          mapTerminalsToAutoOpen: {
            title: 'Auto Open a New Terminal (For Terminal Mapping)',
            description: 'Should a new terminal be opened for new items? **Note:** This works in conjunction with `Map Terminals To` above.',
            type: 'boolean',
            "default": false
          },
          scrollback: {
            title: 'Scroll Back',
            description: 'How many lines of history should be kept?',
            type: 'integer',
            "default": 1000
          },
          shell: {
            title: 'Shell Override',
            description: 'Override the default shell instance to launch.',
            type: 'string',
            "default": (function() {
              var path;
              if (process.platform === 'win32') {
                path = require('path');
                return path.resolve(process.env.SystemRoot, 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
              } else {
                return process.env.SHELL || '/bin/bash';
              }
            })()
          },
          shellArguments: {
            title: 'Shell Arguments',
            description: 'Specify some arguments to use when launching the shell.',
            type: 'string',
            "default": ''
          },
          shellEnv: {
            title: 'Shell Environment Variables',
            description: 'Specify some additional environment variables, space separated with the form `VAR=VALUE`',
            type: 'string',
            "default": ''
          },
          workingDirectory: {
            title: 'Working Directory',
            description: 'Which directory should be the present working directory when a new terminal is made?',
            type: 'string',
            "default": 'Project',
            "enum": ['Home', 'Project', 'Active File']
          }
        }
      },
      style: {
        type: 'object',
        order: 3,
        properties: {
          animationSpeed: {
            title: 'Animation Speed',
            description: 'How fast should the window animate?',
            type: 'number',
            "default": '1',
            minimum: '0',
            maximum: '100'
          },
          fontFamily: {
            title: 'Font Family',
            description: 'Override the terminal\'s default font family. **You must use a [monospaced font](https://en.wikipedia.org/wiki/List_of_typefaces#Monospace)!**',
            type: 'string',
            "default": ''
          },
          fontSize: {
            title: 'Font Size',
            description: 'Override the terminal\'s default font size.',
            type: 'string',
            "default": ''
          },
          defaultPanelHeight: {
            title: 'Default Panel Height',
            description: 'Default height of a terminal panel. **You may enter a value in px, em, or %.**',
            type: 'string',
            "default": '300px'
          },
          theme: {
            title: 'Theme',
            description: 'Select a theme for the terminal.',
            type: 'string',
            "default": 'standard',
            "enum": ['standard', 'inverse', 'linux', 'grass', 'homebrew', 'man-page', 'novel', 'ocean', 'pro', 'red', 'red-sands', 'silver-aerogel', 'solarized-dark', 'solid-colors', 'dracula', 'one-dark', 'christmas', 'predawn']
          }
        }
      },
      ansiColors: {
        type: 'object',
        order: 4,
        properties: {
          normal: {
            type: 'object',
            order: 1,
            properties: {
              black: {
                title: 'Black',
                description: 'Black color used for terminal ANSI color set.',
                type: 'color',
                "default": '#000000'
              },
              red: {
                title: 'Red',
                description: 'Red color used for terminal ANSI color set.',
                type: 'color',
                "default": '#CD0000'
              },
              green: {
                title: 'Green',
                description: 'Green color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00CD00'
              },
              yellow: {
                title: 'Yellow',
                description: 'Yellow color used for terminal ANSI color set.',
                type: 'color',
                "default": '#CDCD00'
              },
              blue: {
                title: 'Blue',
                description: 'Blue color used for terminal ANSI color set.',
                type: 'color',
                "default": '#0000CD'
              },
              magenta: {
                title: 'Magenta',
                description: 'Magenta color used for terminal ANSI color set.',
                type: 'color',
                "default": '#CD00CD'
              },
              cyan: {
                title: 'Cyan',
                description: 'Cyan color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00CDCD'
              },
              white: {
                title: 'White',
                description: 'White color used for terminal ANSI color set.',
                type: 'color',
                "default": '#E5E5E5'
              }
            }
          },
          zBright: {
            type: 'object',
            order: 2,
            properties: {
              brightBlack: {
                title: 'Bright Black',
                description: 'Bright black color used for terminal ANSI color set.',
                type: 'color',
                "default": '#7F7F7F'
              },
              brightRed: {
                title: 'Bright Red',
                description: 'Bright red color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FF0000'
              },
              brightGreen: {
                title: 'Bright Green',
                description: 'Bright green color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00FF00'
              },
              brightYellow: {
                title: 'Bright Yellow',
                description: 'Bright yellow color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FFFF00'
              },
              brightBlue: {
                title: 'Bright Blue',
                description: 'Bright blue color used for terminal ANSI color set.',
                type: 'color',
                "default": '#0000FF'
              },
              brightMagenta: {
                title: 'Bright Magenta',
                description: 'Bright magenta color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FF00FF'
              },
              brightCyan: {
                title: 'Bright Cyan',
                description: 'Bright cyan color used for terminal ANSI color set.',
                type: 'color',
                "default": '#00FFFF'
              },
              brightWhite: {
                title: 'Bright White',
                description: 'Bright white color used for terminal ANSI color set.',
                type: 'color',
                "default": '#FFFFFF'
              }
            }
          }
        }
      },
      iconColors: {
        type: 'object',
        order: 5,
        properties: {
          red: {
            title: 'Status Icon Red',
            description: 'Red color used for status icon.',
            type: 'color',
            "default": 'red'
          },
          orange: {
            title: 'Status Icon Orange',
            description: 'Orange color used for status icon.',
            type: 'color',
            "default": 'orange'
          },
          yellow: {
            title: 'Status Icon Yellow',
            description: 'Yellow color used for status icon.',
            type: 'color',
            "default": 'yellow'
          },
          green: {
            title: 'Status Icon Green',
            description: 'Green color used for status icon.',
            type: 'color',
            "default": 'green'
          },
          blue: {
            title: 'Status Icon Blue',
            description: 'Blue color used for status icon.',
            type: 'color',
            "default": 'blue'
          },
          purple: {
            title: 'Status Icon Purple',
            description: 'Purple color used for status icon.',
            type: 'color',
            "default": 'purple'
          },
          pink: {
            title: 'Status Icon Pink',
            description: 'Pink color used for status icon.',
            type: 'color',
            "default": 'hotpink'
          },
          cyan: {
            title: 'Status Icon Cyan',
            description: 'Cyan color used for status icon.',
            type: 'color',
            "default": 'cyan'
          },
          magenta: {
            title: 'Status Icon Magenta',
            description: 'Magenta color used for status icon.',
            type: 'color',
            "default": 'magenta'
          }
        }
      },
      customTexts: {
        type: 'object',
        order: 6,
        properties: {
          customText1: {
            title: 'Custom text 1',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-1, $S is replaced by selection, $F is replaced by file name, $D is replaced by file directory, $L is replaced by line number of cursor, $$ is replaced by $',
            type: 'string',
            "default": ''
          },
          customText2: {
            title: 'Custom text 2',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-2',
            type: 'string',
            "default": ''
          },
          customText3: {
            title: 'Custom text 3',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-3',
            type: 'string',
            "default": ''
          },
          customText4: {
            title: 'Custom text 4',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-4',
            type: 'string',
            "default": ''
          },
          customText5: {
            title: 'Custom text 5',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-5',
            type: 'string',
            "default": ''
          },
          customText6: {
            title: 'Custom text 6',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-6',
            type: 'string',
            "default": ''
          },
          customText7: {
            title: 'Custom text 7',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-7',
            type: 'string',
            "default": ''
          },
          customText8: {
            title: 'Custom text 8',
            description: 'Text to paste when calling platformio-ide-terminal:insert-custom-text-8',
            type: 'string',
            "default": ''
          }
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL2hvbWUvbHVjYW1hcnRpbmVsbGkvLmF0b20vcGFja2FnZXMvcGxhdGZvcm1pby1pZGUtdGVybWluYWwvbGliL3BsYXRmb3JtaW8taWRlLXRlcm1pbmFsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7SUFBQSxTQUFBLEVBQVcsSUFBWDtJQUVBLFFBQUEsRUFBVSxTQUFBLEdBQUEsQ0FGVjtJQUlBLFVBQUEsRUFBWSxTQUFBO0FBQ1YsVUFBQTs7V0FBYyxDQUFFLE9BQWhCLENBQUE7O2FBQ0EsSUFBQyxDQUFBLGFBQUQsR0FBaUI7SUFGUCxDQUpaO0lBUUEsNEJBQUEsRUFBOEIsU0FBQTthQUM1QjtRQUFBLGdCQUFBLEVBQWtCLFNBQUMsU0FBRDtBQUNoQixjQUFBO0FBQUE7ZUFBQSxpQkFBQTs7eUJBQ0UsT0FBTyxDQUFDLEdBQUksQ0FBQSxJQUFBLENBQVosR0FBb0I7QUFEdEI7O1FBRGdCLENBQWxCO1FBR0EsR0FBQSxFQUFLLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUMsUUFBRDttQkFDSCxLQUFDLENBQUEsYUFBYSxDQUFDLHVCQUFmLENBQXVDLFFBQXZDO1VBREc7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBSEw7UUFLQSxnQkFBQSxFQUFrQixDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFBO21CQUNoQixLQUFDLENBQUEsYUFBYSxDQUFDO1VBREM7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTGxCO1FBT0EsSUFBQSxFQUFNLENBQUEsU0FBQSxLQUFBO2lCQUFBLFNBQUE7bUJBQ0osS0FBQyxDQUFBLGFBQWEsQ0FBQyxjQUFmLENBQUE7VUFESTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FQTjs7SUFENEIsQ0FSOUI7SUFtQkEsb0JBQUEsRUFBc0IsU0FBQTthQUNwQjtRQUFBLEdBQUEsRUFBSyxDQUFBLFNBQUEsS0FBQTtpQkFBQSxTQUFDLFFBQUQ7bUJBQ0gsS0FBQyxDQUFBLGFBQWEsQ0FBQyx1QkFBZixDQUF1QyxRQUF2QztVQURHO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFMO1FBRUEsZ0JBQUEsRUFBa0IsQ0FBQSxTQUFBLEtBQUE7aUJBQUEsU0FBQTttQkFDaEIsS0FBQyxDQUFBLGFBQWEsQ0FBQztVQURDO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUZsQjs7SUFEb0IsQ0FuQnRCO0lBeUJBLGdCQUFBLEVBQWtCLFNBQUMsaUJBQUQ7YUFDaEIsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBSSxDQUFDLE9BQUEsQ0FBUSxjQUFSLENBQUQsQ0FBSixDQUE2QixpQkFBN0I7SUFERCxDQXpCbEI7SUE0QkEsTUFBQSxFQUNFO01BQUEsT0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxLQUFBLEVBQU8sQ0FEUDtRQUVBLFVBQUEsRUFDRTtVQUFBLFNBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyx3QkFBUDtZQUNBLFdBQUEsRUFBYSwrQ0FEYjtZQUVBLElBQUEsRUFBTSxTQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxLQUhUO1dBREY7VUFLQSxXQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sY0FBUDtZQUNBLFdBQUEsRUFBYSxzREFEYjtZQUVBLElBQUEsRUFBTSxTQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxJQUhUO1dBTkY7VUFVQSxlQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sbUJBQVA7WUFDQSxXQUFBLEVBQWEsbUlBRGI7WUFFQSxJQUFBLEVBQU0sU0FGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsSUFIVDtXQVhGO1VBZUEsWUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGdCQUFQO1lBQ0EsV0FBQSxFQUFhLGtEQURiO1lBRUEsSUFBQSxFQUFNLFNBRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLElBSFQ7V0FoQkY7VUFvQkEsVUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGFBQVA7WUFDQSxXQUFBLEVBQWEsOEJBRGI7WUFFQSxJQUFBLEVBQU0sU0FGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsSUFIVDtXQXJCRjtTQUhGO09BREY7TUE2QkEsSUFBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxLQUFBLEVBQU8sQ0FEUDtRQUVBLFVBQUEsRUFDRTtVQUFBLGNBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyxrQkFBUDtZQUNBLFdBQUEsRUFBYSw0Q0FEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxFQUhUO1dBREY7VUFLQSxjQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sa0JBQVA7WUFDQSxXQUFBLEVBQWEscUdBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsTUFIVDtZQUlBLENBQUEsSUFBQSxDQUFBLEVBQU0sQ0FBQyxNQUFELEVBQVMsTUFBVCxFQUFpQixRQUFqQixDQUpOO1dBTkY7VUFXQSxzQkFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGlEQUFQO1lBQ0EsV0FBQSxFQUFhLG1IQURiO1lBRUEsSUFBQSxFQUFNLFNBRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBSFQ7V0FaRjtVQWdCQSxVQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sYUFBUDtZQUNBLFdBQUEsRUFBYSwyQ0FEYjtZQUVBLElBQUEsRUFBTSxTQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxJQUhUO1dBakJGO1VBcUJBLEtBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyxnQkFBUDtZQUNBLFdBQUEsRUFBYSxnREFEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBWSxDQUFBLFNBQUE7QUFDVixrQkFBQTtjQUFBLElBQUcsT0FBTyxDQUFDLFFBQVIsS0FBb0IsT0FBdkI7Z0JBQ0UsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSO3VCQUNQLElBQUksQ0FBQyxPQUFMLENBQWEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUF6QixFQUFxQyxVQUFyQyxFQUFpRCxtQkFBakQsRUFBc0UsTUFBdEUsRUFBOEUsZ0JBQTlFLEVBRkY7ZUFBQSxNQUFBO3VCQUlFLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBWixJQUFxQixZQUp2Qjs7WUFEVSxDQUFBLENBQUgsQ0FBQSxDQUhUO1dBdEJGO1VBK0JBLGNBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyxpQkFBUDtZQUNBLFdBQUEsRUFBYSx5REFEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxFQUhUO1dBaENGO1VBb0NBLFFBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyw2QkFBUDtZQUNBLFdBQUEsRUFBYSwwRkFEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxFQUhUO1dBckNGO1VBeUNBLGdCQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sbUJBQVA7WUFDQSxXQUFBLEVBQWEsc0ZBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsU0FIVDtZQUlBLENBQUEsSUFBQSxDQUFBLEVBQU0sQ0FBQyxNQUFELEVBQVMsU0FBVCxFQUFvQixhQUFwQixDQUpOO1dBMUNGO1NBSEY7T0E5QkY7TUFnRkEsS0FBQSxFQUNFO1FBQUEsSUFBQSxFQUFNLFFBQU47UUFDQSxLQUFBLEVBQU8sQ0FEUDtRQUVBLFVBQUEsRUFDRTtVQUFBLGNBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyxpQkFBUDtZQUNBLFdBQUEsRUFBYSxxQ0FEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxHQUhUO1lBSUEsT0FBQSxFQUFTLEdBSlQ7WUFLQSxPQUFBLEVBQVMsS0FMVDtXQURGO1VBT0EsVUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGFBQVA7WUFDQSxXQUFBLEVBQWEsZ0pBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQVJGO1VBWUEsUUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLFdBQVA7WUFDQSxXQUFBLEVBQWEsNkNBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQWJGO1VBaUJBLGtCQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sc0JBQVA7WUFDQSxXQUFBLEVBQWEsZ0ZBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsT0FIVDtXQWxCRjtVQXNCQSxLQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sT0FBUDtZQUNBLFdBQUEsRUFBYSxrQ0FEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxVQUhUO1lBSUEsQ0FBQSxJQUFBLENBQUEsRUFBTSxDQUNKLFVBREksRUFFSixTQUZJLEVBR0osT0FISSxFQUlKLE9BSkksRUFLSixVQUxJLEVBTUosVUFOSSxFQU9KLE9BUEksRUFRSixPQVJJLEVBU0osS0FUSSxFQVVKLEtBVkksRUFXSixXQVhJLEVBWUosZ0JBWkksRUFhSixnQkFiSSxFQWNKLGNBZEksRUFlSixTQWZJLEVBZ0JKLFVBaEJJLEVBaUJKLFdBakJJLEVBa0JKLFNBbEJJLENBSk47V0F2QkY7U0FIRjtPQWpGRjtNQW1JQSxVQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLEtBQUEsRUFBTyxDQURQO1FBRUEsVUFBQSxFQUNFO1VBQUEsTUFBQSxFQUNFO1lBQUEsSUFBQSxFQUFNLFFBQU47WUFDQSxLQUFBLEVBQU8sQ0FEUDtZQUVBLFVBQUEsRUFDRTtjQUFBLEtBQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sT0FBUDtnQkFDQSxXQUFBLEVBQWEsK0NBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBREY7Y0FLQSxHQUFBLEVBQ0U7Z0JBQUEsS0FBQSxFQUFPLEtBQVA7Z0JBQ0EsV0FBQSxFQUFhLDZDQURiO2dCQUVBLElBQUEsRUFBTSxPQUZOO2dCQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsU0FIVDtlQU5GO2NBVUEsS0FBQSxFQUNFO2dCQUFBLEtBQUEsRUFBTyxPQUFQO2dCQUNBLFdBQUEsRUFBYSwrQ0FEYjtnQkFFQSxJQUFBLEVBQU0sT0FGTjtnQkFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLFNBSFQ7ZUFYRjtjQWVBLE1BQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sUUFBUDtnQkFDQSxXQUFBLEVBQWEsZ0RBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBaEJGO2NBb0JBLElBQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sTUFBUDtnQkFDQSxXQUFBLEVBQWEsOENBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBckJGO2NBeUJBLE9BQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sU0FBUDtnQkFDQSxXQUFBLEVBQWEsaURBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBMUJGO2NBOEJBLElBQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sTUFBUDtnQkFDQSxXQUFBLEVBQWEsOENBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBL0JGO2NBbUNBLEtBQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sT0FBUDtnQkFDQSxXQUFBLEVBQWEsK0NBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBcENGO2FBSEY7V0FERjtVQTRDQSxPQUFBLEVBQ0U7WUFBQSxJQUFBLEVBQU0sUUFBTjtZQUNBLEtBQUEsRUFBTyxDQURQO1lBRUEsVUFBQSxFQUNFO2NBQUEsV0FBQSxFQUNFO2dCQUFBLEtBQUEsRUFBTyxjQUFQO2dCQUNBLFdBQUEsRUFBYSxzREFEYjtnQkFFQSxJQUFBLEVBQU0sT0FGTjtnQkFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLFNBSFQ7ZUFERjtjQUtBLFNBQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sWUFBUDtnQkFDQSxXQUFBLEVBQWEsb0RBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBTkY7Y0FVQSxXQUFBLEVBQ0U7Z0JBQUEsS0FBQSxFQUFPLGNBQVA7Z0JBQ0EsV0FBQSxFQUFhLHNEQURiO2dCQUVBLElBQUEsRUFBTSxPQUZOO2dCQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsU0FIVDtlQVhGO2NBZUEsWUFBQSxFQUNFO2dCQUFBLEtBQUEsRUFBTyxlQUFQO2dCQUNBLFdBQUEsRUFBYSx1REFEYjtnQkFFQSxJQUFBLEVBQU0sT0FGTjtnQkFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLFNBSFQ7ZUFoQkY7Y0FvQkEsVUFBQSxFQUNFO2dCQUFBLEtBQUEsRUFBTyxhQUFQO2dCQUNBLFdBQUEsRUFBYSxxREFEYjtnQkFFQSxJQUFBLEVBQU0sT0FGTjtnQkFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLFNBSFQ7ZUFyQkY7Y0F5QkEsYUFBQSxFQUNFO2dCQUFBLEtBQUEsRUFBTyxnQkFBUDtnQkFDQSxXQUFBLEVBQWEsd0RBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBMUJGO2NBOEJBLFVBQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sYUFBUDtnQkFDQSxXQUFBLEVBQWEscURBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBL0JGO2NBbUNBLFdBQUEsRUFDRTtnQkFBQSxLQUFBLEVBQU8sY0FBUDtnQkFDQSxXQUFBLEVBQWEsc0RBRGI7Z0JBRUEsSUFBQSxFQUFNLE9BRk47Z0JBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxTQUhUO2VBcENGO2FBSEY7V0E3Q0Y7U0FIRjtPQXBJRjtNQStOQSxVQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLEtBQUEsRUFBTyxDQURQO1FBRUEsVUFBQSxFQUNFO1VBQUEsR0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGlCQUFQO1lBQ0EsV0FBQSxFQUFhLGlDQURiO1lBRUEsSUFBQSxFQUFNLE9BRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEtBSFQ7V0FERjtVQUtBLE1BQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyxvQkFBUDtZQUNBLFdBQUEsRUFBYSxvQ0FEYjtZQUVBLElBQUEsRUFBTSxPQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxRQUhUO1dBTkY7VUFVQSxNQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sb0JBQVA7WUFDQSxXQUFBLEVBQWEsb0NBRGI7WUFFQSxJQUFBLEVBQU0sT0FGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsUUFIVDtXQVhGO1VBZUEsS0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLG1CQUFQO1lBQ0EsV0FBQSxFQUFhLG1DQURiO1lBRUEsSUFBQSxFQUFNLE9BRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLE9BSFQ7V0FoQkY7VUFvQkEsSUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGtCQUFQO1lBQ0EsV0FBQSxFQUFhLGtDQURiO1lBRUEsSUFBQSxFQUFNLE9BRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLE1BSFQ7V0FyQkY7VUF5QkEsTUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLG9CQUFQO1lBQ0EsV0FBQSxFQUFhLG9DQURiO1lBRUEsSUFBQSxFQUFNLE9BRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLFFBSFQ7V0ExQkY7VUE4QkEsSUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGtCQUFQO1lBQ0EsV0FBQSxFQUFhLGtDQURiO1lBRUEsSUFBQSxFQUFNLE9BRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLFNBSFQ7V0EvQkY7VUFtQ0EsSUFBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGtCQUFQO1lBQ0EsV0FBQSxFQUFhLGtDQURiO1lBRUEsSUFBQSxFQUFNLE9BRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLE1BSFQ7V0FwQ0Y7VUF3Q0EsT0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLHFCQUFQO1lBQ0EsV0FBQSxFQUFhLHFDQURiO1lBRUEsSUFBQSxFQUFNLE9BRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLFNBSFQ7V0F6Q0Y7U0FIRjtPQWhPRjtNQWdSQSxXQUFBLEVBQ0U7UUFBQSxJQUFBLEVBQU0sUUFBTjtRQUNBLEtBQUEsRUFBTyxDQURQO1FBRUEsVUFBQSxFQUNFO1VBQUEsV0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGVBQVA7WUFDQSxXQUFBLEVBQWEsbU9BRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQURGO1VBS0EsV0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGVBQVA7WUFDQSxXQUFBLEVBQWEseUVBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQU5GO1VBVUEsV0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGVBQVA7WUFDQSxXQUFBLEVBQWEseUVBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQVhGO1VBZUEsV0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGVBQVA7WUFDQSxXQUFBLEVBQWEseUVBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQWhCRjtVQW9CQSxXQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sZUFBUDtZQUNBLFdBQUEsRUFBYSx5RUFEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxFQUhUO1dBckJGO1VBeUJBLFdBQUEsRUFDRTtZQUFBLEtBQUEsRUFBTyxlQUFQO1lBQ0EsV0FBQSxFQUFhLHlFQURiO1lBRUEsSUFBQSxFQUFNLFFBRk47WUFHQSxDQUFBLE9BQUEsQ0FBQSxFQUFTLEVBSFQ7V0ExQkY7VUE4QkEsV0FBQSxFQUNFO1lBQUEsS0FBQSxFQUFPLGVBQVA7WUFDQSxXQUFBLEVBQWEseUVBRGI7WUFFQSxJQUFBLEVBQU0sUUFGTjtZQUdBLENBQUEsT0FBQSxDQUFBLEVBQVMsRUFIVDtXQS9CRjtVQW1DQSxXQUFBLEVBQ0U7WUFBQSxLQUFBLEVBQU8sZUFBUDtZQUNBLFdBQUEsRUFBYSx5RUFEYjtZQUVBLElBQUEsRUFBTSxRQUZOO1lBR0EsQ0FBQSxPQUFBLENBQUEsRUFBUyxFQUhUO1dBcENGO1NBSEY7T0FqUkY7S0E3QkY7O0FBREYiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9XG4gIHN0YXR1c0JhcjogbnVsbFxuXG4gIGFjdGl2YXRlOiAtPlxuXG4gIGRlYWN0aXZhdGU6IC0+XG4gICAgQHN0YXR1c0JhclRpbGU/LmRlc3Ryb3koKVxuICAgIEBzdGF0dXNCYXJUaWxlID0gbnVsbFxuXG4gIHByb3ZpZGVQbGF0Zm9ybUlPSURFVGVybWluYWw6IC0+XG4gICAgdXBkYXRlUHJvY2Vzc0VudjogKHZhcmlhYmxlcykgLT5cbiAgICAgIGZvciBuYW1lLCB2YWx1ZSBvZiB2YXJpYWJsZXNcbiAgICAgICAgcHJvY2Vzcy5lbnZbbmFtZV0gPSB2YWx1ZVxuICAgIHJ1bjogKGNvbW1hbmRzKSA9PlxuICAgICAgQHN0YXR1c0JhclRpbGUucnVuQ29tbWFuZEluTmV3VGVybWluYWwgY29tbWFuZHNcbiAgICBnZXRUZXJtaW5hbFZpZXdzOiAoKSA9PlxuICAgICAgQHN0YXR1c0JhclRpbGUudGVybWluYWxWaWV3c1xuICAgIG9wZW46ICgpID0+XG4gICAgICBAc3RhdHVzQmFyVGlsZS5ydW5OZXdUZXJtaW5hbCgpXG5cbiAgcHJvdmlkZVJ1bkluVGVybWluYWw6IC0+XG4gICAgcnVuOiAoY29tbWFuZHMpID0+XG4gICAgICBAc3RhdHVzQmFyVGlsZS5ydW5Db21tYW5kSW5OZXdUZXJtaW5hbCBjb21tYW5kc1xuICAgIGdldFRlcm1pbmFsVmlld3M6ICgpID0+XG4gICAgICBAc3RhdHVzQmFyVGlsZS50ZXJtaW5hbFZpZXdzXG5cbiAgY29uc3VtZVN0YXR1c0JhcjogKHN0YXR1c0JhclByb3ZpZGVyKSAtPlxuICAgIEBzdGF0dXNCYXJUaWxlID0gbmV3IChyZXF1aXJlICcuL3N0YXR1cy1iYXInKShzdGF0dXNCYXJQcm92aWRlcilcblxuICBjb25maWc6XG4gICAgdG9nZ2xlczpcbiAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICBvcmRlcjogMVxuICAgICAgcHJvcGVydGllczpcbiAgICAgICAgYXV0b0Nsb3NlOlxuICAgICAgICAgIHRpdGxlOiAnQ2xvc2UgVGVybWluYWwgb24gRXhpdCdcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Nob3VsZCB0aGUgdGVybWluYWwgY2xvc2UgaWYgdGhlIHNoZWxsIGV4aXRzPydcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICBjdXJzb3JCbGluazpcbiAgICAgICAgICB0aXRsZTogJ0N1cnNvciBCbGluaydcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1Nob3VsZCB0aGUgY3Vyc29yIGJsaW5rIHdoZW4gdGhlIHRlcm1pbmFsIGlzIGFjdGl2ZT8nXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgICAgICBydW5JbnNlcnRlZFRleHQ6XG4gICAgICAgICAgdGl0bGU6ICdSdW4gSW5zZXJ0ZWQgVGV4dCdcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1J1biB0ZXh0IGluc2VydGVkIHZpYSBgcGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LXRleHRgIGFzIGEgY29tbWFuZD8gKipUaGlzIHdpbGwgYXBwZW5kIGFuIGVuZC1vZi1saW5lIGNoYXJhY3RlciB0byBpbnB1dC4qKidcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIHNlbGVjdFRvQ29weTpcbiAgICAgICAgICB0aXRsZTogJ1NlbGVjdCBUbyBDb3B5J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ29waWVzIHRleHQgdG8gY2xpcGJvYXJkIHdoZW4gc2VsZWN0aW9uIGhhcHBlbnMuJ1xuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICAgICAgbG9naW5TaGVsbDpcbiAgICAgICAgICB0aXRsZTogJ0xvZ2luIFNoZWxsJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVXNlIC0tbG9naW4gb24genNoIGFuZCBiYXNoLidcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgY29yZTpcbiAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICBvcmRlcjogMlxuICAgICAgcHJvcGVydGllczpcbiAgICAgICAgYXV0b1J1bkNvbW1hbmQ6XG4gICAgICAgICAgdGl0bGU6ICdBdXRvIFJ1biBDb21tYW5kJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQ29tbWFuZCB0byBydW4gb24gdGVybWluYWwgaW5pdGlhbGl6YXRpb24uJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgbWFwVGVybWluYWxzVG86XG4gICAgICAgICAgdGl0bGU6ICdNYXAgVGVybWluYWxzIFRvJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTWFwIHRlcm1pbmFscyB0byBlYWNoIGZpbGUgb3IgZm9sZGVyLiBEZWZhdWx0IGlzIG5vIGFjdGlvbiBvciBtYXBwaW5nIGF0IGFsbC4gKipSZXN0YXJ0IHJlcXVpcmVkLioqJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJ05vbmUnXG4gICAgICAgICAgZW51bTogWydOb25lJywgJ0ZpbGUnLCAnRm9sZGVyJ11cbiAgICAgICAgbWFwVGVybWluYWxzVG9BdXRvT3BlbjpcbiAgICAgICAgICB0aXRsZTogJ0F1dG8gT3BlbiBhIE5ldyBUZXJtaW5hbCAoRm9yIFRlcm1pbmFsIE1hcHBpbmcpJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2hvdWxkIGEgbmV3IHRlcm1pbmFsIGJlIG9wZW5lZCBmb3IgbmV3IGl0ZW1zPyAqKk5vdGU6KiogVGhpcyB3b3JrcyBpbiBjb25qdW5jdGlvbiB3aXRoIGBNYXAgVGVybWluYWxzIFRvYCBhYm92ZS4nXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgc2Nyb2xsYmFjazpcbiAgICAgICAgICB0aXRsZTogJ1Njcm9sbCBCYWNrJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSG93IG1hbnkgbGluZXMgb2YgaGlzdG9yeSBzaG91bGQgYmUga2VwdD8nXG4gICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgZGVmYXVsdDogMTAwMFxuICAgICAgICBzaGVsbDpcbiAgICAgICAgICB0aXRsZTogJ1NoZWxsIE92ZXJyaWRlJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT3ZlcnJpZGUgdGhlIGRlZmF1bHQgc2hlbGwgaW5zdGFuY2UgdG8gbGF1bmNoLidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6IGRvIC0+XG4gICAgICAgICAgICBpZiBwcm9jZXNzLnBsYXRmb3JtIGlzICd3aW4zMidcbiAgICAgICAgICAgICAgcGF0aCA9IHJlcXVpcmUgJ3BhdGgnXG4gICAgICAgICAgICAgIHBhdGgucmVzb2x2ZShwcm9jZXNzLmVudi5TeXN0ZW1Sb290LCAnU3lzdGVtMzInLCAnV2luZG93c1Bvd2VyU2hlbGwnLCAndjEuMCcsICdwb3dlcnNoZWxsLmV4ZScpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIHByb2Nlc3MuZW52LlNIRUxMIHx8ICcvYmluL2Jhc2gnXG4gICAgICAgIHNoZWxsQXJndW1lbnRzOlxuICAgICAgICAgIHRpdGxlOiAnU2hlbGwgQXJndW1lbnRzJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU3BlY2lmeSBzb21lIGFyZ3VtZW50cyB0byB1c2Ugd2hlbiBsYXVuY2hpbmcgdGhlIHNoZWxsLidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIHNoZWxsRW52OlxuICAgICAgICAgIHRpdGxlOiAnU2hlbGwgRW52aXJvbm1lbnQgVmFyaWFibGVzJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU3BlY2lmeSBzb21lIGFkZGl0aW9uYWwgZW52aXJvbm1lbnQgdmFyaWFibGVzLCBzcGFjZSBzZXBhcmF0ZWQgd2l0aCB0aGUgZm9ybSBgVkFSPVZBTFVFYCdcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIHdvcmtpbmdEaXJlY3Rvcnk6XG4gICAgICAgICAgdGl0bGU6ICdXb3JraW5nIERpcmVjdG9yeSdcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1doaWNoIGRpcmVjdG9yeSBzaG91bGQgYmUgdGhlIHByZXNlbnQgd29ya2luZyBkaXJlY3Rvcnkgd2hlbiBhIG5ldyB0ZXJtaW5hbCBpcyBtYWRlPydcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICdQcm9qZWN0J1xuICAgICAgICAgIGVudW06IFsnSG9tZScsICdQcm9qZWN0JywgJ0FjdGl2ZSBGaWxlJ11cbiAgICBzdHlsZTpcbiAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICBvcmRlcjogM1xuICAgICAgcHJvcGVydGllczpcbiAgICAgICAgYW5pbWF0aW9uU3BlZWQ6XG4gICAgICAgICAgdGl0bGU6ICdBbmltYXRpb24gU3BlZWQnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdIb3cgZmFzdCBzaG91bGQgdGhlIHdpbmRvdyBhbmltYXRlPydcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcxJ1xuICAgICAgICAgIG1pbmltdW06ICcwJ1xuICAgICAgICAgIG1heGltdW06ICcxMDAnXG4gICAgICAgIGZvbnRGYW1pbHk6XG4gICAgICAgICAgdGl0bGU6ICdGb250IEZhbWlseSdcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ092ZXJyaWRlIHRoZSB0ZXJtaW5hbFxcJ3MgZGVmYXVsdCBmb250IGZhbWlseS4gKipZb3UgbXVzdCB1c2UgYSBbbW9ub3NwYWNlZCBmb250XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MaXN0X29mX3R5cGVmYWNlcyNNb25vc3BhY2UpISoqJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgZm9udFNpemU6XG4gICAgICAgICAgdGl0bGU6ICdGb250IFNpemUnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdPdmVycmlkZSB0aGUgdGVybWluYWxcXCdzIGRlZmF1bHQgZm9udCBzaXplLidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIGRlZmF1bHRQYW5lbEhlaWdodDpcbiAgICAgICAgICB0aXRsZTogJ0RlZmF1bHQgUGFuZWwgSGVpZ2h0J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBoZWlnaHQgb2YgYSB0ZXJtaW5hbCBwYW5lbC4gKipZb3UgbWF5IGVudGVyIGEgdmFsdWUgaW4gcHgsIGVtLCBvciAlLioqJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJzMwMHB4J1xuICAgICAgICB0aGVtZTpcbiAgICAgICAgICB0aXRsZTogJ1RoZW1lJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2VsZWN0IGEgdGhlbWUgZm9yIHRoZSB0ZXJtaW5hbC4nXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnc3RhbmRhcmQnXG4gICAgICAgICAgZW51bTogW1xuICAgICAgICAgICAgJ3N0YW5kYXJkJyxcbiAgICAgICAgICAgICdpbnZlcnNlJyxcbiAgICAgICAgICAgICdsaW51eCcsXG4gICAgICAgICAgICAnZ3Jhc3MnLFxuICAgICAgICAgICAgJ2hvbWVicmV3JyxcbiAgICAgICAgICAgICdtYW4tcGFnZScsXG4gICAgICAgICAgICAnbm92ZWwnLFxuICAgICAgICAgICAgJ29jZWFuJyxcbiAgICAgICAgICAgICdwcm8nLFxuICAgICAgICAgICAgJ3JlZCcsXG4gICAgICAgICAgICAncmVkLXNhbmRzJyxcbiAgICAgICAgICAgICdzaWx2ZXItYWVyb2dlbCcsXG4gICAgICAgICAgICAnc29sYXJpemVkLWRhcmsnLFxuICAgICAgICAgICAgJ3NvbGlkLWNvbG9ycycsXG4gICAgICAgICAgICAnZHJhY3VsYScsXG4gICAgICAgICAgICAnb25lLWRhcmsnLFxuICAgICAgICAgICAgJ2NocmlzdG1hcycsXG4gICAgICAgICAgICAncHJlZGF3bidcbiAgICAgICAgICBdXG4gICAgYW5zaUNvbG9yczpcbiAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICBvcmRlcjogNFxuICAgICAgcHJvcGVydGllczpcbiAgICAgICAgbm9ybWFsOlxuICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgICAgb3JkZXI6IDFcbiAgICAgICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICAgICAgYmxhY2s6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQmxhY2snXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmxhY2sgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDAwMDAwJ1xuICAgICAgICAgICAgcmVkOlxuICAgICAgICAgICAgICB0aXRsZTogJ1JlZCdcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZWQgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjQ0QwMDAwJ1xuICAgICAgICAgICAgZ3JlZW46XG4gICAgICAgICAgICAgIHRpdGxlOiAnR3JlZW4nXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnR3JlZW4gY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDBDRDAwJ1xuICAgICAgICAgICAgeWVsbG93OlxuICAgICAgICAgICAgICB0aXRsZTogJ1llbGxvdydcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdZZWxsb3cgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjQ0RDRDAwJ1xuICAgICAgICAgICAgYmx1ZTpcbiAgICAgICAgICAgICAgdGl0bGU6ICdCbHVlJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JsdWUgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDAwMENEJ1xuICAgICAgICAgICAgbWFnZW50YTpcbiAgICAgICAgICAgICAgdGl0bGU6ICdNYWdlbnRhJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ01hZ2VudGEgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjQ0QwMENEJ1xuICAgICAgICAgICAgY3lhbjpcbiAgICAgICAgICAgICAgdGl0bGU6ICdDeWFuJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0N5YW4gY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDBDRENEJ1xuICAgICAgICAgICAgd2hpdGU6XG4gICAgICAgICAgICAgIHRpdGxlOiAnV2hpdGUnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnV2hpdGUgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjRTVFNUU1J1xuICAgICAgICB6QnJpZ2h0OlxuICAgICAgICAgIHR5cGU6ICdvYmplY3QnXG4gICAgICAgICAgb3JkZXI6IDJcbiAgICAgICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICAgICAgYnJpZ2h0QmxhY2s6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQnJpZ2h0IEJsYWNrJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JyaWdodCBibGFjayBjb2xvciB1c2VkIGZvciB0ZXJtaW5hbCBBTlNJIGNvbG9yIHNldC4nXG4gICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgICAgZGVmYXVsdDogJyM3RjdGN0YnXG4gICAgICAgICAgICBicmlnaHRSZWQ6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQnJpZ2h0IFJlZCdcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCcmlnaHQgcmVkIGNvbG9yIHVzZWQgZm9yIHRlcm1pbmFsIEFOU0kgY29sb3Igc2V0LidcbiAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICBkZWZhdWx0OiAnI0ZGMDAwMCdcbiAgICAgICAgICAgIGJyaWdodEdyZWVuOlxuICAgICAgICAgICAgICB0aXRsZTogJ0JyaWdodCBHcmVlbidcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCcmlnaHQgZ3JlZW4gY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjMDBGRjAwJ1xuICAgICAgICAgICAgYnJpZ2h0WWVsbG93OlxuICAgICAgICAgICAgICB0aXRsZTogJ0JyaWdodCBZZWxsb3cnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQnJpZ2h0IHllbGxvdyBjb2xvciB1c2VkIGZvciB0ZXJtaW5hbCBBTlNJIGNvbG9yIHNldC4nXG4gICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgICAgZGVmYXVsdDogJyNGRkZGMDAnXG4gICAgICAgICAgICBicmlnaHRCbHVlOlxuICAgICAgICAgICAgICB0aXRsZTogJ0JyaWdodCBCbHVlJ1xuICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0JyaWdodCBibHVlIGNvbG9yIHVzZWQgZm9yIHRlcm1pbmFsIEFOU0kgY29sb3Igc2V0LidcbiAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICBkZWZhdWx0OiAnIzAwMDBGRidcbiAgICAgICAgICAgIGJyaWdodE1hZ2VudGE6XG4gICAgICAgICAgICAgIHRpdGxlOiAnQnJpZ2h0IE1hZ2VudGEnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQnJpZ2h0IG1hZ2VudGEgY29sb3IgdXNlZCBmb3IgdGVybWluYWwgQU5TSSBjb2xvciBzZXQuJ1xuICAgICAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgICAgIGRlZmF1bHQ6ICcjRkYwMEZGJ1xuICAgICAgICAgICAgYnJpZ2h0Q3lhbjpcbiAgICAgICAgICAgICAgdGl0bGU6ICdCcmlnaHQgQ3lhbidcbiAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCcmlnaHQgY3lhbiBjb2xvciB1c2VkIGZvciB0ZXJtaW5hbCBBTlNJIGNvbG9yIHNldC4nXG4gICAgICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICAgICAgZGVmYXVsdDogJyMwMEZGRkYnXG4gICAgICAgICAgICBicmlnaHRXaGl0ZTpcbiAgICAgICAgICAgICAgdGl0bGU6ICdCcmlnaHQgV2hpdGUnXG4gICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQnJpZ2h0IHdoaXRlIGNvbG9yIHVzZWQgZm9yIHRlcm1pbmFsIEFOU0kgY29sb3Igc2V0LidcbiAgICAgICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgICAgICBkZWZhdWx0OiAnI0ZGRkZGRidcbiAgICBpY29uQ29sb3JzOlxuICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgIG9yZGVyOiA1XG4gICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICByZWQ6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBSZWQnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdSZWQgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAncmVkJ1xuICAgICAgICBvcmFuZ2U6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBPcmFuZ2UnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdPcmFuZ2UgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAnb3JhbmdlJ1xuICAgICAgICB5ZWxsb3c6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBZZWxsb3cnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdZZWxsb3cgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAneWVsbG93J1xuICAgICAgICBncmVlbjpcbiAgICAgICAgICB0aXRsZTogJ1N0YXR1cyBJY29uIEdyZWVuJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnR3JlZW4gY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAnZ3JlZW4nXG4gICAgICAgIGJsdWU6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBCbHVlJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQmx1ZSBjb2xvciB1c2VkIGZvciBzdGF0dXMgaWNvbi4nXG4gICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgIGRlZmF1bHQ6ICdibHVlJ1xuICAgICAgICBwdXJwbGU6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBQdXJwbGUnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdQdXJwbGUgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAncHVycGxlJ1xuICAgICAgICBwaW5rOlxuICAgICAgICAgIHRpdGxlOiAnU3RhdHVzIEljb24gUGluaydcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1BpbmsgY29sb3IgdXNlZCBmb3Igc3RhdHVzIGljb24uJ1xuICAgICAgICAgIHR5cGU6ICdjb2xvcidcbiAgICAgICAgICBkZWZhdWx0OiAnaG90cGluaydcbiAgICAgICAgY3lhbjpcbiAgICAgICAgICB0aXRsZTogJ1N0YXR1cyBJY29uIEN5YW4nXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdDeWFuIGNvbG9yIHVzZWQgZm9yIHN0YXR1cyBpY29uLidcbiAgICAgICAgICB0eXBlOiAnY29sb3InXG4gICAgICAgICAgZGVmYXVsdDogJ2N5YW4nXG4gICAgICAgIG1hZ2VudGE6XG4gICAgICAgICAgdGl0bGU6ICdTdGF0dXMgSWNvbiBNYWdlbnRhJ1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTWFnZW50YSBjb2xvciB1c2VkIGZvciBzdGF0dXMgaWNvbi4nXG4gICAgICAgICAgdHlwZTogJ2NvbG9yJ1xuICAgICAgICAgIGRlZmF1bHQ6ICdtYWdlbnRhJ1xuICAgIGN1c3RvbVRleHRzOlxuICAgICAgdHlwZTogJ29iamVjdCdcbiAgICAgIG9yZGVyOiA2XG4gICAgICBwcm9wZXJ0aWVzOlxuICAgICAgICBjdXN0b21UZXh0MTpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDEnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtMSwgJFMgaXMgcmVwbGFjZWQgYnkgc2VsZWN0aW9uLCAkRiBpcyByZXBsYWNlZCBieSBmaWxlIG5hbWUsICREIGlzIHJlcGxhY2VkIGJ5IGZpbGUgZGlyZWN0b3J5LCAkTCBpcyByZXBsYWNlZCBieSBsaW5lIG51bWJlciBvZiBjdXJzb3IsICQkIGlzIHJlcGxhY2VkIGJ5ICQnXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICBjdXN0b21UZXh0MjpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDInXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtMidcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIGN1c3RvbVRleHQzOlxuICAgICAgICAgIHRpdGxlOiAnQ3VzdG9tIHRleHQgMydcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RleHQgdG8gcGFzdGUgd2hlbiBjYWxsaW5nIHBsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC0zJ1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgY3VzdG9tVGV4dDQ6XG4gICAgICAgICAgdGl0bGU6ICdDdXN0b20gdGV4dCA0J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGV4dCB0byBwYXN0ZSB3aGVuIGNhbGxpbmcgcGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTQnXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICBjdXN0b21UZXh0NTpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDUnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtNSdcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIGN1c3RvbVRleHQ2OlxuICAgICAgICAgIHRpdGxlOiAnQ3VzdG9tIHRleHQgNidcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RleHQgdG8gcGFzdGUgd2hlbiBjYWxsaW5nIHBsYXRmb3JtaW8taWRlLXRlcm1pbmFsOmluc2VydC1jdXN0b20tdGV4dC02J1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgY3VzdG9tVGV4dDc6XG4gICAgICAgICAgdGl0bGU6ICdDdXN0b20gdGV4dCA3J1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGV4dCB0byBwYXN0ZSB3aGVuIGNhbGxpbmcgcGxhdGZvcm1pby1pZGUtdGVybWluYWw6aW5zZXJ0LWN1c3RvbS10ZXh0LTcnXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICBjdXN0b21UZXh0ODpcbiAgICAgICAgICB0aXRsZTogJ0N1c3RvbSB0ZXh0IDgnXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdUZXh0IHRvIHBhc3RlIHdoZW4gY2FsbGluZyBwbGF0Zm9ybWlvLWlkZS10ZXJtaW5hbDppbnNlcnQtY3VzdG9tLXRleHQtOCdcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICAgIGRlZmF1bHQ6ICcnXG4iXX0=
