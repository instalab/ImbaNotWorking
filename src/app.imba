const data = [
	{
		id: '23cn672567b2'
		label: 'One'
	},
	{
		id: '23876b7782nc'
		label: 'Two'
	},
	{
		id: '32894n3249yn'
		label: 'Three'
		parent: '23876b7782nc'
	}
]

const store = {
	
}

document.addEventListener 'mouseup' do
	store:moving = false

tag Element
	prop element
	prop depth
	
	def onmousedown e
		store:ismoving = true
	
	def render
		<self>
			for i in [0..depth]
				<div css:width="12px" css:height="12px">
			<div.element> element:label

tag App
	def findChildrenOf id
		let children = []
		for d in data
			if d:parent === id
				children.push d
		return children
	
	def renderElement data, depth = 0
		let elements = [<Element element=data depth=depth>]
		for child in self.findChildrenOf data:id
			elements:push.apply elements, self.renderElement child, depth+1
		return elements
	
	def render
		<self>
			for d in data when !d:parent
				self.renderElement d

Imba.mount <App>
