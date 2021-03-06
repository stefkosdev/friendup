/*©agpl*************************************************************************
*                                                                              *
* This file is part of FRIEND UNIFYING PLATFORM.                               *
*                                                                              *
* This program is free software: you can redistribute it and/or modify         *
* it under the terms of the GNU Affero General Public License as published by  *
* the Free Software Foundation, either version 3 of the License, or            *
* (at your option) any later version.                                          *
*                                                                              *
* This program is distributed in the hope that it will be useful,              *
* but WITHOUT ANY WARRANTY; without even the implied warranty of               *
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the                 *
* GNU Affero General Public License for more details.                          *
*                                                                              *
* You should have received a copy of the GNU Affero General Public License     *
* along with this program.  If not, see <http://www.gnu.org/licenses/>.        *
*                                                                              *
*****************************************************************************©*/

Application.run = function( msg, iface )
{
	var m = new Module( 'system' );
	m.onExecuted = function( e, d )
	{
		if( e != 'ok' )
		{
			ge( 'Users' ).innerHTML = '<p class="Layout">' + i18n( 'i18n_no_users_available' ) + '</p>';
			return;
		}
		var rows = JSON.parse( d );
		var str = '<table class="List">';
		var sw = 1;
		for( var a = 0; a < rows.length; a++ )
		{
			sw = sw == 1 ? 2 : 1;
			str += '<tr class="sw' + sw + '">';
			str += '<td>' + rows[a].FullName + '</td><td style="width: 25px"><input type="checkbox" userid="' + rows[a].ID + '"/></td>';
			str += '</tr>';
		}
		str += '</table>';
		ge( 'Users' ).innerHTML = str;
	}
	m.execute( 'listusers' );
}

// Add selected
function addSelected()
{
	var mems = [];
	var eles = ge( 'Users' ).getElementsByTagName( 'input' );
	for( var a = 0; a < eles.length; a++ )
	{
		if( eles[a].getAttribute( 'userid' ) && eles[a].checked )
		{
			mems.push( eles[a].getAttribute( 'userid' ) );
		}
	}
	var op = {
		command: 'addmembers',
		destinationViewId: ge( 'parentViewId' ).value,
		members: mems.join( ',' )
	};
	Application.sendMessage( op );
	
	cancelWorkgroup();
}

function cancelWorkgroup()
{
	Application.sendMessage( {
		type: 'view', method: 'close'
	} );
}

