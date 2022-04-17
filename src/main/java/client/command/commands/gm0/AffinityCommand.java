package client.command.commands.gm0;
import client.Client;
import client.command.Command;
import scripting.npc.NPCScriptManager;

public class AffinityCommand extends Command {
    {
        setDescription("Opens up All-In-One NPC.");
    }
    @Override
    public void execute(Client c, String[] params) {
        NPCScriptManager.getInstance().start(c, 22000, null, null);
    }
}