import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle";
import { Card } from "./ui/card";
import { useMainStore } from "@/hooks/useMainStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { NzNavigationMenuLink } from "./xui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";


export default function Header() {
    const { logout } = useAuth()
    const profile = useMainStore(store => store.profile)
    return <header className="h-16 flex items-center border-b-2 px-4">
        <NavigationMenu className="max-w-full">
            <NavigationMenuList>
                <Card>
                    <NavigationMenuLink href="/dashboard" className={navigationMenuTriggerStyle() + ' !text-foreground'}>
                        <img className="h-7 mr-1" src='/dashboard/logo.svg' /> 哪吒监控
                    </NavigationMenuLink>
                </Card>

                {
                    profile && <>
                        <NavigationMenuItem>
                            <NzNavigationMenuLink href="/dashboard" active className={navigationMenuTriggerStyle()}>
                                Server
                            </NzNavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NzNavigationMenuLink href="/dashboard/service" className={navigationMenuTriggerStyle()}>
                                Service
                            </NzNavigationMenuLink>
                        </NavigationMenuItem>
                    </>
                }
            </NavigationMenuList>
            <div className="ml-auto flex items-center">
                <ModeToggle />
                {
                    profile && <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="ml-1 h-8 w-8 cursor-pointer border-foreground border-[1px]">
                                    <AvatarImage src={'https://api.dicebear.com/7.x/notionists/svg?seed=' + profile.username} alt={profile.username} />
                                    <AvatarFallback>{profile.username}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>{profile.username}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User />
                                        <span>Profile</span>
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut />
                                    <span>Log out</span>
                                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                }
            </div>
        </NavigationMenu>
    </header>
}
