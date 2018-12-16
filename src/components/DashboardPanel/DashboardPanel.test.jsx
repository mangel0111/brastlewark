import React from 'react';
import { mount } from 'enzyme';
import DashboardPanel from './DashboardPanel';
import GnomeBox from '../GnomeBox';
import Input from '..//Input';

let props = {
};

describe('Dashboard Panel', ()=> {
	beforeEach(()=> {
		props = {
			gnomes: [
				{'id':0,'name':'Tobus Quickwhistle','thumbnail':'http://www.publicdomainpictures.net/pictures/10000/nahled/thinking-monkey-11282237747K8xB.jpg','age':306,'weight':39.065952,'height':107.75835,'hair_color':'Pink','professions':['Metalworker','Woodcarver','Stonecarver',' Tinker','Tailor','Potter'],'friends':['Cogwitz Chillwidget','Tinadette Chillbuster']},
				{'id':1,'name':'Fizkin Voidbuster','thumbnail':'http://www.publicdomainpictures.net/pictures/120000/nahled/white-hen.jpg','age':288,'weight':35.279167,'height':110.43628,'hair_color':'Green','professions':['Brewer','Medic','Prospector','Gemcutter','Mason','Tailor'],'friends':[]},
				{'id':2,'name':'Malbin Chromerocket','thumbnail':'http://www.publicdomainpictures.net/pictures/30000/nahled/maple-leaves-background.jpg','age':166,'weight':35.88665,'height':106.14395,'hair_color':'Red','professions':['Cook','Baker','Miner'],'friends':['Fizwood Voidtossle']},
				{'id':3,'name':'Midwig Gyroslicer','thumbnail':'http://www.publicdomainpictures.net/pictures/10000/nahled/1-1275919724d1Oh.jpg','age':240,'weight':40.97596,'height':127.88554,'hair_color':'Red','professions':['Carpenter','Farmer','Stonecarver','Brewer','Tax inspector','Prospector'],'friends':['Sarabink Tinkbuster','Tinadette Wrongslicer']},
				{'id':4,'name':'Malbin Magnaweaver','thumbnail':'http://www.publicdomainpictures.net/pictures/10000/nahled/zebra-head-11281366876AZ3M.jpg','age':89,'weight':43.506973,'height':101.6974,'hair_color':'Black','professions':['Smelter',' Tinker'],'friends':['Fizkin Fussslicer','Cogwitz Chillwidget']},
				{'id':5,'name':'Zedkin Quickbuster','thumbnail':'http://www.publicdomainpictures.net/pictures/10000/nahled/1-1193219094.jpg','age':273,'weight':38.742382,'height':91.54829,'hair_color':'Red','professions':['Cook'],'friends':['Libalia Quickbooster','Whitwright Mystwhistle']},{'id':6,'name':'Emmadette Gimbalpower','thumbnail':'http://www.publicdomainpictures.net/pictures/20000/nahled/stingray.jpg','age':212,'weight':40.681095,'height':98.701645,'hair_color':'Green','professions':['Mason'],'friends':['Ecki Gyrobuster','Zedkin Nozzlespackle','Milli Clankswhistle','Libalia Magnatink']},
				{'id':7,'name':'Twizzle Chrometossle','thumbnail':'http://www.publicdomainpictures.net/pictures/10000/nahled/1-1275919724d1Oh.jpg','age':85,'weight':38.953087,'height':96.0678,'hair_color':'Red','professions':['Baker','Brewer','Tax inspector'],'friends':['Libalia Mystbooster','Zedkin Gyrotorque']},
				{'id':8,'name':'Malbert Tinkbuster','thumbnail':'http://www.publicdomainpictures.net/pictures/10000/velka/1-1248161543llOC.jpg','age':186,'weight':41.159805,'height':118.27941,'hair_color':'Gray','professions':['Baker','Mason'],'friends':[]},
				{'id':9,'name':'Kinthony Nozzlebooster','thumbnail':'http://www.publicdomainpictures.net/pictures/20000/nahled/baby-lamb.jpg','age':233,'weight':41.024612,'height':113.56545,'hair_color':'Red','professions':['Smelter','Miner','Tax inspector','Carpenter'],'friends':['Zedkin Clankstorque','Midwig Magnarivet']}]
		};
	});
	it('should match snaptshot dashboard', () => {
		const dashboardPanel = mount(<DashboardPanel {...props} />);
		expect(dashboardPanel).toMatchSnapshot();
	});
	it('should render dashboard panel',()=> {
		// Mount Dashboard with none list of gnomes because the normal is that the first time never receive anything because the server was no called yet.
		const dashboardPanel = mount(<DashboardPanel gnomes={[]}/>);
		expect(dashboardPanel.find(GnomeBox).length).toEqual(0);
        
		// Mock the response of the server with 10 gnomes, the component will receive these props and validate that the 10 GnomeBox components are rendered.
		dashboardPanel.setProps(props);
		expect(dashboardPanel.find(GnomeBox).length).toEqual(10);
        
		//Find the filter component.
		const input = dashboardPanel.find(Input);

		// We mock the user iteration and send to the input an valid change event, and also we validate that the state change accordely, the filter text in the state  and is only one GnomeBox displayed.
		input.at(0).props().onChange({ target: { value: 'Tobus'}});
		expect(dashboardPanel.state('filterText')).toEqual('Tobus');
		dashboardPanel.update();
		expect(dashboardPanel.find(GnomeBox).length).toEqual(1);  
        
		// Then we validate the case where I just pass a letter and when we reset the filter to nothing again.
		input.at(0).props().onChange({ target: { value: 'a'}});
		expect(dashboardPanel.state('filterText')).toEqual('a');
		dashboardPanel.update();
		expect(dashboardPanel.find(GnomeBox).length).toEqual(4); 
        
		input.at(0).props().onChange({ target: { value: ''}});
		expect(dashboardPanel.state('filterText')).toEqual('');
		dashboardPanel.update();
		expect(dashboardPanel.find(GnomeBox).length).toEqual(10); 
	});
});
