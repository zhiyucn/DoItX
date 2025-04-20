Blockly.Blocks['get_time'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('获取时间');
      this.setOutput(true, null);
      this.setColour(300);
      this.setTooltip('获取当前时间');
      this.setHelpUrl('');
    }
  };

Blockly.Python['get_time'] = function(block) {
    // 检测是否导入了 datetime 模块
    if (!Blockly.Python.definitions_['import_datetime']) {
      Blockly.Python.definitions_['import_datetime'] = 'import datetime';
    }
    return ["datetime.datetime.now()", Blockly.Python.ORDER_FUNCTION_CALL];
  };
  
 