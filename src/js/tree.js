;(function(w){
	w.Tree = function(){
		this.panelElements = {
			node: 'Node element',
		};
		this.appWrapper = document.querySelector('#app');
		this.dragBool = false;
		this.draggableElem = null;
		this.data = {};
		this.createElem = function(tag, props, html, children){
			var element = document.createElement(tag);
			for(let prop in props){
				element.setAttribute(prop,props[prop]);
			}
			if(html) element.innerHTML = html;		
			if(children){
				if(children instanceof Element){
					element.appendChild(children);
				}
				if(children instanceof Array){
					children.forEach(function(elem,index){
						elem instanceof Element ? element.appendChild(elem) : console.log(elem+': Не является DOM элементом');
					});
				}
			}
			return element;
		};
		this.build = function(){
			this.buildArea();
			this.buildPanel();
		};
		this.buildArea = function(){
			this.area = this.createElem('div', {
				class: 'app-area'
			});
			this.appWrapper.appendChild(this.area);
		};
		this.buildPanel = function(){
			var title = this.createElem('h1', {}, 'Tree app'),
				childs = [title];
			
			for(let elem in this.panelElements){
				var panelElem = this.createElem('div', {
					class: 'app-panel-elem app-panel-elem__'+elem
				}, this.panelElements[elem]);
				panelElem.dataset.type = elem;
				childs.push(panelElem);
				this.panelElemListeners(panelElem, elem);
			}

			this.panel = this.createElem('div', {
				class: 'app-panel'
			}, '', childs);

			this.appWrapper.appendChild(this.panel);
		};
		this.panelElemListeners = function(elem, type){
			var self = this;
			elem.addEventListener('mousedown', function(e){
				self.draggableElem = self.createElem('div', {
					class: 'app-panel-elem app-panel-elem__draggable app-panel-elem__'+type
				});
				self.moveTo(self.draggableElem, e.pageX, e.pageY);
				self.appWrapper.appendChild(self.draggableElem);
				self.dragBool = true;
			});
		};
		this.runWrapperListeners = function(){
			var self = this;
			this.appWrapper.addEventListener('mousemove', function(e){
				if(self.dragBool && self.draggableElem) self.moveTo(self.draggableElem, e.pageX, e.pageY);
			});
			this.appWrapper.addEventListener('mouseup', function(e){
				self.dragBool = false;
				if(!e.target.classList.contains('app-node')){
					self.draggableElem.classList.add('remove');
					setTimeout(function(){
						self.draggableElem.remove();
						self.draggableElem = null;
					}, 500);
				}
			});
		};
		this.moveTo = function(target, x, y){
			target.style.left = x+'px';
			target.style.top = y+'px';
		};
		this.run = function(){
			this.build();
			this.runWrapperListeners();
		};
	};

})(window);
export default Tree;